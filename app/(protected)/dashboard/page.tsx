"use client";

import Link from "next/link";
import { useMemo } from "react";

import Header from "../../components/header/header";
import { readDemoSession } from "../../utils/auth-session";
import {
  communityNotifications,
  communityRequests,
  getUserById,
  getUserByName,
} from "../../utils/mock-community";

function getTopCategory() {
  const counts = communityRequests.reduce<Record<string, number>>(
    (accumulator, request) => {
      accumulator[request.category] = (accumulator[request.category] ?? 0) + 1;
      return accumulator;
    },
    {},
  );

  return (
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Community"
  );
}

function getSkillSuggestions(name: string) {
  const user = getUserByName(name);
  return user.skills.slice(0, 3).join(", ");
}

export default function DashboardPage() {
  const session = readDemoSession();
  const currentUser = useMemo(
    () => getUserByName(session.name),
    [session.name],
  );

  const dashboardStats = [
    {
      label: "Trust score",
      value: `${currentUser.trustScore}%`,
      description: "Driven by solved requests and consistent support.",
    },
    {
      label: "Helping",
      value: communityRequests.filter((request) =>
        request.helperIds.includes(currentUser.id),
      ).length,
      description: "Requests where you are currently listed as a helper.",
    },
    {
      label: "Open requests",
      value: communityRequests.filter((request) => request.status === "Open")
        .length,
      description: "Community requests currently active across the feed.",
    },
    {
      label: "AI pulse",
      value: `${communityRequests.filter((request) => request.category === "Career").length} trends`,
      description: "Trend count detected in the latest request activity.",
    },
  ];

  const aiInsights = [
    {
      label: "Most requested category",
      value: getTopCategory(),
    },
    {
      label: "Your strongest trust driver",
      value: currentUser.badges[0] ?? "Top Mentor",
    },
    {
      label: "AI says you can mentor in",
      value: getSkillSuggestions(currentUser.name),
    },
    {
      label: "Your active requests",
      value: communityRequests
        .filter((request) => request.requesterId === currentUser.id)
        .length.toString(),
    },
  ];

  return (
    <div className="site-shell">
      <Header />

      <main className="container">
        <section className="page-hero">
          <div className="panel">
            <p className="eyebrow">Dashboard</p>
            <h1 style={{ fontSize: "clamp(2.3rem, 4vw, 4.2rem)" }}>
              Welcome back, {currentUser.name}.
            </h1>
            <p>
              Your command center for requests, AI insights, helper momentum,
              and live community activity.
            </p>
          </div>
        </section>

        <section className="mini-grid section">
          {dashboardStats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <p className="eyebrow">{stat.label}</p>
              <div className="stat-value">{stat.value}</div>
              <p>{stat.description}</p>
            </div>
          ))}
        </section>

        <section className="dashboard-grid section">
          <div className="stack">
            <div className="section-head">
              <div>
                <p className="section-kicker">Recent requests</p>
                <h2>What the community needs right now</h2>
              </div>
              <Link href="/explore" className="btn btn-secondary">
                Go to feed
              </Link>
            </div>

            <div className="stack">
              {communityRequests.map((request) => {
                const requester = getUserById(request.requesterId);

                return (
                  <article key={request.id} className="request-card">
                    <div className="card-meta">
                      <span className="tag">{request.category}</span>
                      <span
                        className={`tag ${["Critical", "High"].includes(request.urgency) ? "urgent" : ""}`}
                      >
                        {request.urgency}
                      </span>
                      <span
                        className={`tag ${request.status === "Solved" ? "success" : ""}`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <h3>{request.title}</h3>
                    <p>{request.description}</p>

                    <div className="tag-row">
                      {request.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className="list-item"
                      style={{ paddingBottom: 0, borderBottom: 0 }}
                    >
                      <div>
                        <strong>{requester?.name ?? "Unknown user"}</strong>
                        <p>
                          {request.location} • {request.helperIds.length} helper
                          {request.helperIds.length === 1 ? "" : "s"} interested
                        </p>
                      </div>
                      <Link
                        href={`/requests/${request.id}`}
                        className="btn btn-secondary"
                      >
                        Open details
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="stack">
            <div className="panel">
              <p className="section-kicker">AI insights</p>
              <h3>Suggested actions for you</h3>
              <div>
                {aiInsights.map((insight) => (
                  <div key={insight.label} className="metric">
                    <span>{insight.label}</span>
                    <strong>{insight.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <p className="section-kicker">Notifications</p>
              <h3>Latest updates</h3>
              <div className="notif-list">
                {communityNotifications.map((notification) => (
                  <div key={notification.id} className="notif-item">
                    <div>
                      <strong>{notification.title}</strong>
                      <p>
                        {notification.type} • {notification.time}
                      </p>
                    </div>
                    <span
                      className={`tag ${notification.status === "Unread" ? "urgent" : ""}`}
                    >
                      {notification.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

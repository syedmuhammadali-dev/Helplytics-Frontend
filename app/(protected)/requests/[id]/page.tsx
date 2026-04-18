"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Header from "../../../components/header/header";
import {
  communityRequests,
  demoUsers,
  getUserById,
} from "../../../utils/mock-community";

export default function RequestDetailPage() {
  const params = useParams<{ id: string }>();
  const request =
    communityRequests.find((item) => item.id === params.id) ??
    communityRequests[0];
  const requester = getUserById(request.requesterId);
  const helpers = demoUsers.filter((user) =>
    request.helperIds.includes(user.id),
  );

  return (
    <div className="site-shell">
      <Header />

      <main className="container">
        <section className="section">
          <Link href="/explore" className="pill">
            Back to explore feed
          </Link>
        </section>

        <section className="page-hero">
          <div className="panel">
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
            <p className="eyebrow">Request Detail</p>
            <h1 style={{ fontSize: "clamp(2.3rem, 4vw, 4rem)" }}>
              {request.title}
            </h1>
            <p>{request.description}</p>
          </div>
        </section>

        <section className="detail-grid section">
          <div className="stack">
            <div className="panel">
              <p className="section-kicker">AI contextual summary</p>
              <h3>What this request needs most</h3>
              <p>{request.aiSummary}</p>
              <div className="tag-row">
                {request.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel">
              <p className="section-kicker">Community actions</p>
              <h3>Support or close the request</h3>
              <div className="row">
                <button type="button" className="btn btn-primary">
                  I can help
                </button>
                <button type="button" className="btn btn-secondary">
                  Mark as solved
                </button>
              </div>
            </div>
          </div>

          <div className="stack">
            <div className="panel">
              <p className="section-kicker">Requester</p>
              <div className="user-line">
                <div className="avatar teal">
                  {requester?.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <strong>{requester?.name ?? "Unknown user"}</strong>
                  <p>
                    {request.location} • Trust {requester?.trustScore ?? 0}%
                  </p>
                </div>
              </div>
            </div>

            <div className="panel">
              <p className="section-kicker">Helper pool</p>
              <h3>People ready to support</h3>
              <div className="helper-list">
                {helpers.map((helper, index) => (
                  <div key={helper.id} className="helper-item">
                    <div className="user-line">
                      <div
                        className={`avatar ${index === 0 ? "teal" : "dark"}`}
                      >
                        {helper.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <strong>{helper.name}</strong>
                        <p>{helper.skills.slice(0, 3).join(", ")}</p>
                      </div>
                    </div>
                    <span className="tag">Trust {helper.trustScore}%</span>
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

"use client";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Header from "../../components/header/header";
import {
  getApiErrorMessage,
  markAllNotificationsRead,
  markNotificationRead,
  useCommunityStore,
} from "../../utils/community-store";

export default function NotificationsPage() {
  const state = useCommunityStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card-dark p-12 relative overflow-hidden"
          >
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-primary/15 blur-[120px] rounded-full" />
            <span className="section-label text-primary">Notifications</span>
            <h1 className="text-5xl font-bold mb-4 max-w-4xl">
              Stay updated on requests, helpers, and trust signals.
            </h1>
          </motion.div>

          <div className="premium-card p-12">
            <div className="section-head">
              <div>
                <span className="section-label text-text-muted">Live Updates</span>
                <h2 className="text-4xl font-bold text-dark mb-0">
                  Notification feed
                </h2>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  void (async () => {
                    try {
                      await markAllNotificationsRead();
                      await state.refresh();
                      toast.success("All notifications marked as read.");
                    } catch (error: unknown) {
                      toast.error(
                        getApiErrorMessage(error, "Failed to update notifications."),
                      );
                    }
                  })();
                }}
              >
                Mark all as read
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {state.notifications.map((notif) => (
                <button
                  key={notif.id}
                  type="button"
                  onClick={() => {
                    void (async () => {
                      try {
                        await markNotificationRead(notif.id);
                        await state.refresh();
                      } catch (error: unknown) {
                        toast.error(
                          getApiErrorMessage(error, "Failed to update notification."),
                        );
                      }
                    })();
                  }}
                  className="p-6 rounded-[1.5rem] bg-bg-card border border-black/5 hover:bg-white hover:shadow-lg transition-all text-left cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-dark text-lg group-hover:text-primary transition-colors">
                      {notif.title}
                    </div>
                    <div className="text-text-muted text-xs font-medium uppercase tracking-tight">
                      {notif.type} • {notif.time}
                    </div>
                  </div>
                  <div
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      notif.status === "Unread"
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-white text-text-muted opacity-40"
                    }`}
                  >
                    {notif.status}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


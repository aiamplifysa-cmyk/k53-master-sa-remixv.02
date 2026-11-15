import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  LayoutDashboard,
  Signpost,
  ClipboardCheck,
  Car,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  WifiOff,
  CloudCheck,
  RotateCcw,
  GraduationCap,
  Info,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudy } from "./study-provider";
import type { ReactNode } from "react";
import { getAdminRole } from "@/lib/admin-role";
const nav = [
  { to: "/", label: "My learning", icon: LayoutDashboard },
  { to: "/learn", label: "Learn by category", icon: BookOpen },
  { to: "/signs", label: "Road signs", icon: Signpost },
  { to: "/practice", label: "Practice questions", icon: ClipboardCheck },
  { to: "/mock-test", label: "Mock test", icon: GraduationCap },
  { to: "/review", label: "Review mistakes", icon: RotateCcw },
] as const;
export function AppShell({ children }: { children: ReactNode }) {
  const path = useLocation().pathname;
  const { user, ready, loadError, cloudError, storageError, online, syncState, retry, name } =
    useStudy();
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Signpost size={25} />
          </span>
          <span>
            K53<span className="brand-master">MASTER SA</span>
          </span>
        </Link>
        <div className="sidebar-label">YOUR LEARNING SPACE</div>
        <nav className="main-nav">
          {nav.map((n) => (
            <Button
              asChild
              variant="ghost"
              key={n.to}
              className={`nav-link ${path === n.to ? "nav-active" : ""}`}
            >
              <Link to={n.to} aria-label={n.label} title={n.label}>
                <n.icon size={19} />
                <span>{n.label}</span>
                {n.to === "/review" && retry.length > 0 ? (
                  <span className="nav-count">{retry.length}</span>
                ) : null}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="sidebar-label resources-label">ON THE ROAD</div>
        <nav className="main-nav">
          <Button
            asChild
            variant="ghost"
            className={`nav-link ${path === "/practical" ? "nav-active" : ""}`}
          >
            <Link
              to="/practical"
              aria-label="Practical driving guide"
              title="Practical driving guide"
            >
              <Car />
              <span>Practical driving guide</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={`nav-link ${path === "/dltc" ? "nav-active" : ""}`}
          >
            <Link to="/dltc" aria-label="DLTC & resources" title="DLTC & resources">
              <MapPin />
              <span>DLTC & resources</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={`nav-link ${path === "/about" ? "nav-active" : ""}`}
          >
            <Link to="/about" aria-label="About & legal" title="About & legal">
              <Info />
              <span>About & legal</span>
            </Link>
          </Button>
          {getAdminRole({ app_metadata: user?.app_metadata }) ? (
            <Button
              asChild
              variant="ghost"
              className={`nav-link ${path === "/admin" ? "nav-active" : ""}`}
            >
              <Link to="/admin" aria-label="App administration" title="App administration">
                <Settings2 />
                <span>Administration</span>
              </Link>
            </Button>
          ) : null}
        </nav>
        <div className="sidebar-bottom">
          <div className="sa-flag" aria-label="South Africa">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span>Made for South African roads</span>
          <small>Learn with confidence. Drive with care.</small>
        </div>
      </aside>
      <div className="app-body">
        <header className="topbar">
          <div className="breadcrumb">
            Your journey <ChevronRight size={14} />
            <strong>
              {nav.find((n) => n.to === path)?.label ??
                (path === "/practical"
                  ? "Practical driving"
                  : path === "/dltc"
                    ? "DLTC & resources"
                    : path === "/about"
                      ? "About & legal"
                      : path === "/admin"
                        ? "Administration"
                        : "Your account")}
            </strong>
          </div>
          <div className="header-right">
            <span className="connection">
              {online ? <CloudCheck size={16} /> : <WifiOff size={16} />}
              <span>
                {!ready
                  ? loadError
                    ? "Progress unavailable"
                    : "Loading progress…"
                  : storageError
                    ? "Progress not saved"
                    : cloudError
                      ? "Cloud sync unavailable"
                      : online
                        ? syncState
                        : "Offline · saved on device"}
              </span>
            </span>
            <Button asChild variant="ghost" className="account-button">
              <Link to="/auth">
                <span className="avatar">{user ? name.slice(0, 1).toUpperCase() : "L"}</span>
                <span>
                  {user ? name : "Learner"}
                  <small>{user ? "My account" : "Sign in to sync"} </small>
                </span>
                <ArrowUpRight size={15} />
              </Link>
            </Button>
          </div>
        </header>
        <main className="content" aria-busy={!ready && !loadError}>
          {ready ? (
            <>
              {storageError ? (
                <p className="cloud-warning" role="alert">
                  {storageError}
                </p>
              ) : null}
              {cloudError ? (
                <p className="cloud-warning" role="status">
                  {cloudError}
                </p>
              ) : null}
              {children}
            </>
          ) : (
            <section className="study-loading" role={loadError ? "alert" : "status"}>
              <div className="daily-icon">{loadError ? <RotateCcw /> : <BookOpen />}</div>
              <h1>{loadError ? "Your progress is unavailable" : "Opening your study space"}</h1>
              <p>{loadError ?? "Restoring progress saved on this device…"}</p>
              {loadError ? (
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Reload app
                </Button>
              ) : null}
            </section>
          )}
        </main>
        <footer className="page-footer">
          <span>K53 Master SA · AI Amplify SA (Pty) Ltd</span>
          <span>
            Not affiliated with the Department of Transport · <Link to="/about">About & legal</Link>
          </span>
        </footer>
      </div>
    </div>
  );
}

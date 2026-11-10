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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudy } from "./study-provider";
import type { ReactNode } from "react";
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
  const { user, online, syncState, retry, name } = useStudy();
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
              <Link to={n.to}>
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
            <Link to="/practical">
              <Car />
              Practical driving guide
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={`nav-link ${path === "/dltc" ? "nav-active" : ""}`}
          >
            <Link to="/dltc">
              <MapPin />
              DLTC & resources
            </Link>
          </Button>
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
                    : "Your account")}
            </strong>
          </div>
          <div className="header-right">
            <span className="connection">
              {online ? <CloudCheck size={16} /> : <WifiOff size={16} />}
              <span>{online ? syncState : "Offline · saved on device"}</span>
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
        <main className="content">{children}</main>
        <footer className="page-footer">
          <span>K53 Master SA</span>
          <span>One lesson closer to the open road.</span>
        </footer>
      </div>
    </div>
  );
}

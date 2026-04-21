import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdminDashboard from "./AdminDashboard";

// Mock Supabase client — select with count must return a proper Promise resolving to { count }
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ count: 10, data: null, error: null }),
    })),
  },
}));

describe("AdminDashboard", () => {
  it("renders dashboard title and overview text", async () => {
    render(<AdminDashboard />);

    // findByText auto-waits for any pending async state updates
    expect(await screen.findByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Overview of your platform")).toBeInTheDocument();
  });

  it("displays all metric card titles", async () => {
    render(<AdminDashboard />);

    // Await initial render settling to avoid act() warnings
    await screen.findByText("Dashboard");

    expect(screen.getByText("Total Articles")).toBeInTheDocument();
    expect(screen.getByText("Total Posts")).toBeInTheDocument();
    expect(screen.getByText("Waitlist")).toBeInTheDocument();
    expect(screen.getByText("Event Registrations")).toBeInTheDocument();
  });

  it("loads and shows metric counts from supabase", async () => {
    render(<AdminDashboard />);

    // Wait for all 4 MetricsCards to show the mocked count of 10
    const values = await screen.findAllByText("10");
    expect(values.length).toBe(4);
  });
});

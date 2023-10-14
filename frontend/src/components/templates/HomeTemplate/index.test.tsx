import { render, screen } from "@testing-library/react";
import { HomeTemplate } from ".";

describe("HomeTemplate", () => {
  it("renders the HomeTemplate component with the provided sidebar, header, payment status, and button", () => {
    const sidebar = <div>Mock Sidebar</div>;
    const header = <div>Mock Header</div>;
    const content=<div>Content</div>

    render(
      <HomeTemplate
        sidebar={sidebar}
        header={header}
        content={content}
      />
    );

    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

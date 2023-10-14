import { render, screen } from "@testing-library/react";
import ShareIcon from ".";
import Email from "../../../../public/assets/images/Muiicons/Email.svg";

describe("Share Icon", () => {
  it("renders properly", () => {
    render(<ShareIcon srcIcon={Email} title="Email" />);
    const shareIcon = screen.getByTestId("shareIcon");
    expect(shareIcon).toBeInTheDocument();
  });
});

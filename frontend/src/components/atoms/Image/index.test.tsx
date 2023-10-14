import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Apple from "../../../../public/assets/images/BrandIcons/apple.svg";
import Image from ".";
describe("Image components", () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders image with provided src, alt, width, and height", () => {
    const src = Apple;
    const alt = "Image Alt Text";
    const width = "200px";
    const height = "200px";

    const { getByAltText } = render(
      <Image src={src} alt={alt} width={width} height={height} />
    );

    const imageElement = getByAltText(alt);

    expect(imageElement).toBeInTheDocument();
  });

  test("calls onClick function when image is clicked", () => {
    const { getByTestId } = render(<Image onClick={mockOnClick} />);

    const imageElement = getByTestId("image");
    fireEvent.click(imageElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  test('does not call onClick function when image is clicked without onClick prop', () => {
    const { getByTestId } = render(<Image />);

    const imageElement = getByTestId('image');
    fireEvent.click(imageElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});

import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const wrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui, options) => render(ui, { wrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };

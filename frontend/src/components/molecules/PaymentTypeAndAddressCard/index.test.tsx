import { render,screen } from "@testing-library/react";
import { PaymentTypeAndAddressCard } from ".";

const props =  {
    flexDirection:'row-reverse',
    width:'474px',
    content:<div>DUMMY ADDRESS</div>
};

describe("PaymentTypeAndAddressCard", () => {
    it("renders PaymentTypeAndAddressCard properly", () => {
      render(
        <PaymentTypeAndAddressCard {...props}/>
      );
      const paymentTypeAndAddressCard = screen.getByTestId("paymentAddressCard");
      expect(paymentTypeAndAddressCard).toBeInTheDocument();
    });
  });
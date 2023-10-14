import { Meta, StoryObj } from "@storybook/react";
import { PaymentTypeAndAddressCard } from ".";
import { TypographyComponent } from "../../atoms/Typography";
import theme from "../../../theme/theme";
import CreditCardIcon from '@mui/icons-material/CreditCard';

const meta:Meta<typeof PaymentTypeAndAddressCard> = {
    title:"Molecules/PaymentTypeAndAddressCard",
    component:PaymentTypeAndAddressCard
};

export default meta;

type Story = StoryObj<typeof PaymentTypeAndAddressCard>;

const body3Style:React.CSSProperties = {
    fontSize:"16px",
    color:theme.palette.textColor.highemp,
    fontWeight:"400",
    lineHeight:"24px"
};

const captionStyle:React.CSSProperties = {
    color:theme.palette.textColor.medemp,
    fontSize:"14px",
    fontWeight:"400",
    lineHeight:"21px"
};

const radioBtnStyle:React.CSSProperties = {
    color:'purple'
};


export const PaymentType:Story = {
    args:{
        gridStyle:{flexDirection:'row'},
        cardStyle:{width:'474px',boxShadow:'none'},
        cardType:'payment',
        content:<div>
            <TypographyComponent variant="body3" children="Credit card" sx={body3Style} /><br></br>
        <TypographyComponent variant="caption" children="Send from your Visa or Mastercard." sx={captionStyle}/><br></br>
        <TypographyComponent variant="caption" children="Should arrive by January 28th." sx={captionStyle}/><br></br> 
        </div>,
        icon:<CreditCardIcon />
    }
}

export const Address:Story = {
    args:{
        gridStyle:{flexDirection:'row-reverse'},
        cardStyle:{width:'474px',boxShadow:'none'},
        content:<div>3-47,ABC AVENUE,HYD,TELANGANA</div>
    }
}
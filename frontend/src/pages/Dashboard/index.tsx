import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

import { SideNavComponent } from "/src/components/organisms/SideNav";
import { HomeTemplate } from "/src/components/templates/HomeTemplate";
import LogoImg from "/public/assets/images/Logo/Brand.svg";
import { HeaderComponent } from "/src/components/organisms/Header";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { PaymentOverallStatus } from "/src/components/organisms/PaymentStatus";
import "./index.css";
import theme from "/src/theme/theme";
import { CustomButton } from "/src/components/atoms/Button";
import CustomChip from "/src/components/atoms/Chip";
import { Transaction } from "/src/models/transaction";
import { getLoggedInUser, getMyData, patchMyDataById, postMyData } from "/src/services";
import { User } from "/src/models/user";
import { DefaultDashboard } from "/src/components/molecules/DefaultDashboard";
import DashboardImg from "/public/assets/images/Illustrations/default_dash.svg";
import {  DASHBOARD_DEFAULT_MESSAGE, PAYMENT_TRACKER_DATA, STATUS_CANCEL } from "/src/utils/constants";
import { CancelTransferModal } from "/src/components/organisms/CancelTransfer";
import { ShareTractLink } from "/src/components/organisms/ShareTrackLink";

import { Store } from "/src/store/types";

const labelStyles: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "21px",
};

const btnStyles: React.CSSProperties = {
  background: theme.palette.primaryColor[500],
};

export const Dashboard = () => {
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [userDetails, setUserDetails] = useState<User>();
  const [isCancelTransferModalOpen, setIsCancelTransferModalOpen] = useState<
    Record<number, boolean>
  >({});
  const [transferRefund, setTransferRefund] = useState<Record<number, boolean>>(
    {}
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState<
    Record<number, boolean>
  >({});
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const userData = useSelector((state:Store)=>state.user);

 
  useEffect(() => {
    if (!sessionStorage.getItem("email")  || sessionStorage.getItem("email") == "") {
      navigate("/login");
    }
    if (!userDetails) {
      getLoggedInUser("user", sessionStorage.getItem("email") ?? "").then(
        (res) => {
          if (res.data) {
            setUserDetails(res?.data);
            getMyData("transaction?senderId=" + res.data.id).then(
              (res) => {
                if (res.data) {
                  setRecentTransactions(res?.data);
                }
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            navigate("/login");
          }
        },
        (err)=>{
          console.log(err);
          navigate("/login");
        }
      );
    }
  }, [transferRefund]);

  const handleLogoutClick = () => {
   sessionStorage.setItem("email","")
    logout();
  };

  const getTransactions = ()=>{
    getMyData("transaction?senderId=" + userDetails?.id).then(
      (res) => {
        if (res.data) {
          setRecentTransactions(res?.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const handleOpenCancelTransferModal = (id: number) => {
    setIsCancelTransferModalOpen((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleCloseCancelTransferModal = (transaction: Transaction,id:number) => {
   
    setTransferRefund((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    transaction.status = STATUS_CANCEL;
    postMyData("transaction", transaction).then((res)=>{
    getTransactions();
    });
    setIsCancelTransferModalOpen((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleOpenShareModal = (id: number) => {
    setIsShareModalOpen((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleCloseShareModal = (id: number) => {
    setIsShareModalOpen((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const sideNavProps = {
    brand: {
      height: "22px",
      width: "103px",
      src: LogoImg,
    },
    showMenu: 1,
    showBalances: 1,
    menuList: [
      {
        name: "Home",
        icon: <HomeOutlinedIcon />,
        navigateTo: "home",
      },

      {
        name: "Cards",
        icon: <CreditCardOutlinedIcon />,
        navigateTo: "cards",
      },
      {
        name: "Recipients",
        icon: <PeopleAltOutlinedIcon />,
        navigateTo: "recipients",
      },
      {
        name: "Team",
        icon: <WorkspacesOutlinedIcon />,
        chip:<CustomChip variant="filled" label="New" size="small"/>,
        navigateTo: "team",
      },
      {
        name: "Account",
        icon: <PersonOutlineOutlinedIcon />,
        navigateTo: "account",
      },
      {
        name: "Invite & earn 150 GBP",
        icon: <CardGiftcardOutlinedIcon />,
        navigateTo: "invite",
      },
    ],
  };
  const headerProps = {
    userDetails: {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      uniqueId: userDetails?.account,
      profileImage: userDetails?.profileImage,
    },
    handleYourDetailsClick: () => {},
    handleHelpCenterClick: () => {},
    handleSettingsClick: () => {},
    handleLogoutClick: handleLogoutClick,
  };

  const defaultProps = {
    labelText: DASHBOARD_DEFAULT_MESSAGE,
    imgSrc: DashboardImg,
    imageProps: {
      width: "178",
      height: "183",
    },
  };

  const sendMoneyBtnClick = () => {
    navigate("/transferOption");
  };
  return (
    <div className="dashboard-page">
      <HomeTemplate
        sidebar={<SideNavComponent {...sideNavProps} />}
        header={<HeaderComponent {...headerProps} />}
        content={
          <Box className="mainclass">
            <div className="dash-page-header">
              <TypographyComponent
                children="Home"
                sx={{ ...theme.typography.heading1 }}
              />
              <CustomButton
                label="Send money"
                sx={btnStyles}
                className="dash-send-money-btn"
                variant="contained"
                onClick={sendMoneyBtnClick}
              />
            </div>
            <div className="dash-page-content">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction: Transaction) => {
                  const transactionId = transaction?.id ?? 1;
                  return (
                    <>
                      <PaymentOverallStatus
                        key={transaction.id}
                        steps={PAYMENT_TRACKER_DATA}
                        labelStyles={labelStyles}
                        username={
                          transaction?.recipient?.firstName +
                          " " +
                          transaction?.recipient?.lastName
                        }
                        status={transaction?.status}
                        uservalue={
                          transaction?.amount + " " + transaction?.fromCurrency
                        }
                        convertednewvalue={
                          transaction?.convertedAmount +
                          " " +
                          transaction?.toCurrency
                        }
                        accountname={
                          userDetails?.firstName +
                          " " +
                          userDetails?.lastName
                        }
                        accountnumber={
                          "#" + transaction?.recipient?.accountNumber
                        }
                        onClickCancel={() =>
                          handleOpenCancelTransferModal(transactionId)
                        }
                        transactionrefund={
                          transferRefund[transactionId] || false
                        }
                        onClickShare={() => handleOpenShareModal(transactionId)}
                      />
                      <CancelTransferModal
                        handleOpen={() =>
                          handleCloseCancelTransferModal(transaction,transactionId)
                        }
                        open={isCancelTransferModalOpen[transactionId] || false}
                        username={
                          userDetails?.firstName +
                          " " +
                          userDetails?.lastName
                        }
                        sx={{ paddingLeft: "14%" }}
                      />
                      <ShareTractLink
                        open={isShareModalOpen[transactionId] || false}
                        onClose={() => handleCloseShareModal(transactionId)}
                        sx={{ paddingLeft: "12%" }}
                      />
                    </>
                  );
                })
              ) : (
                <DefaultDashboard {...defaultProps} />
              )}
            </div>
          </Box>
        }
      />
    </div>
  );
};

import Image from "/src/components/atoms/Image";
import "./index.css";
import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
interface DefaultDashboardProps {
  imgSrc?: string;
  labelText?: string;
  imageProps: {
    width?: string;
    height?: string;
  };
}
export const DefaultDashboard = (props: DefaultDashboardProps) => {
  const { imgSrc, labelText, imageProps } = props;
  return (
    <div className="default-dashboard-page" data-testid="default-dashboard">
      <div className="default-dashboard-content">
        <div className="default-image-block">
          <Image
            width={imageProps?.width}
            height={imageProps?.height}
            src={imgSrc}
          />
        </div>
        <div className="default-message-block">
          <TypographyComponent
            sx={{
              ...theme.typography.body1,
              color: theme.palette.textColor.medemp,
            }}
          >
            {labelText}
          </TypographyComponent>
        </div>
      </div>
    </div>
  );
};

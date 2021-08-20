/** @jsxImportSource theme-ui **/
import { Flex } from "theme-ui";

type BadgeProps = {
  count: number;
  onDark?: boolean;
  large?: boolean;
  onClick?: () => void;
};

const Stars = ({ count, onDark, large, onClick }: BadgeProps) => {
  return (
    <Flex
      onClick={onClick}
      className="stars"
      sx={{ cursor: "pointer", alignItems: "center" }}
    >
      <img
        className="star"
        src="/images/star.svg"
        sx={
          !large
            ? { width: "auto" }
            : {
                width: "1.125rem",
                height: "1.125rem",
                top: "-0.125rem",
                left: "-0.125rem",
              }
        }
      />
      <div
        className="star-count"
        sx={
          !large
            ? {
                fontWeight: "600",
                color: onDark ? "w3OffWhite" : "black",
                ml: 2,
                fontSize: "1.25rem",
                lineHeight: "1.5rem",
              }
            : {
                fontWeight: "700",

                letterSpacing: "0rem",
                color: onDark ? "w3OffWhite" : "black",
                fontSize: "1.25rem",
                lineHeight: "1.5rem",
              }
        }
      >
        {count}
      </div>
    </Flex>
  );
};

export default Stars;

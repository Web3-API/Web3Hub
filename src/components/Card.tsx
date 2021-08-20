/** @jsxImportSource theme-ui **/
import Stars from "./Stars";
import Badge from "./Badge";
import { cloudFlareGateway } from "../constants";
import stripIPFSPrefix from "../utils/stripIPFSPrefix";
import { APIData } from "../hooks/ens/useGetAPIfromENS";

import { useMemo } from "react";
import { useRouter } from "next/router";
import { Flex, Themed } from "theme-ui";

type CardProps = {
  api?: APIData;
  ipfsHash?: string;
  boxShadowOn?: boolean;
  noHover?: boolean;
  redirectUrl?: string;
};

const Card = ({
  api,
  ipfsHash,
  boxShadowOn,
  noHover,
  redirectUrl,
}: CardProps) => {
  const router = useRouter();

  const redirect = useMemo(
    () => ipfsHash || redirectUrl || "apis/ens/" + api?.pointerUris[0],
    [ipfsHash, redirectUrl, api?.pointerUris]
  );

  return (
    <div
      className="Card"
      sx={{
        borderRadius: "0.5rem",
        bg: "white",
        transition: "transform .2s ease",
        boxShadow: boxShadowOn
          ? "0rem 2rem 2.75rem rgba(28, 94, 93, 0.1)"
          : "none",
        "&:hover": {
          transform: noHover ? "none" : "translateY(-5px)",
          boxShadow: boxShadowOn
            ? "0rem 2rem 2.75rem rgba(28, 94, 93, .125)"
            : "none",
        },
      }}
    >
      {api && api.pointerUris && api.pointerUris.length > 0 ? (
        <div>
          <a
            href="#"
            sx={{ textDecoration: "none", p: 4, width: "100%", height: "100%" }}
            onClick={() => router.replace(redirect)}
          >
            <div className="wrap-contents">
              <div sx={{ display: "block", m: "auto" }}>
                <img
                  className="api-logo"
                  src={`${cloudFlareGateway}${
                    ipfsHash || stripIPFSPrefix(api.locationUri)
                  }${api.icon.replace("./", "/")}`}
                  sx={{
                    width: "8.75rem",
                    height: "8.75rem",
                    display: "block",
                    m: "auto",
                  }}
                />
              </div>

              <div className="info">
                <div className="row" sx={{ justifyContent: "space-between" }}>
                  <Themed.h3
                    className="title"
                    sx={{
                      textAlign: "center",
                      my: 2,
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                      lineHeight: "1.75rem",
                      letterSpacing: "-0.01em",
                      color: "black",
                    }}
                  >
                    {api.name}
                  </Themed.h3>
                  <div
                    className="subtitle"
                    sx={{
                      textAlign: "center",
                      my: 2,
                      fontFamily: "Montserrat",
                      fontSize: "0.875rem",
                      lineHeight: "1.125rem",
                      color: "text",
                      mixBlendMode: "normal",
                    }}
                  >
                    {api.subtext}
                  </div>
                  <Flex
                    sx={{
                      alignItems: "center",
                      m: "auto",
                      justifyContent: "center",
                      my: 3,
                      mb: 4,
                    }}
                  >
                    <Stars count={api.favorites} />
                  </Flex>
                  <Flex sx={{ display: "flex", justifyContent: "center" }}>
                    <Badge label="ipfs" />
                  </Flex>
                </div>
              </div>
            </div>
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default Card;

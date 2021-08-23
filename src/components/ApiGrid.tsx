/** @jsxImportSource theme-ui **/
import { APIData } from "../hooks/ens/useGetAPIfromENS";
import Card from "./Card";
import { useStateValue } from "../state/state";

import { useRouter } from "next/router";
import { Grid, Button } from "theme-ui";

type ApiGridProps = {
  apis: APIData[];
  main?: boolean;
};

const ApiGrid = ({ apis, main }: ApiGridProps) => {
  const [{ search }] = useStateValue();

  const router = useRouter();
  return (
    <div>
      {main ? (
        <>
          <Grid
            gap={"3%"}
            sx={{
              gridTemplateColumns: [
                "1fr",
                "1fr 1fr",
                "1fr 1fr 1fr",
                "1fr 1fr 1fr 1fr",
              ],
              rowGap: ["1%", "2%", "3%", "4%"],
            }}
          >
            {search !== undefined && search.sortedApi !== -1 ? (
              <Card api={search.sortedApi[0]} boxShadowOn />
            ) : (
              apis.map((api, idx) => (
                <Card api={api} boxShadowOn key={idx + "-api"} />
              ))
            )}
          </Grid>
          <p
            sx={{
              mt: "5rem",
              fontFamily: "Montserrat",
              fontSize: "1.25rem",
              lineHeight: "3.25rem",
              textAlign: "center",
              letterSpacing: "-0.0625rem",
              color: "text",
            }}
          >
            You reached the end of the list. <b>Don’t stop here!</b>
            <br />
            <Button
              variant="primaryLarge"
              onClick={() => {
                void router.push("/apis/create?activeTab=create");
              }}
              sx={{ display: "inline-block", ml: 3, mt: 4 }}
            >
              <span>Create New API</span>
            </Button>
          </p>
        </>
      ) : (
        <Grid
          gap={"3%"}
          sx={{
            gridTemplateColumns: [
              "1fr",
              "1fr 1fr",
              "1fr 1fr 1fr",
              "1fr 1fr 1fr 1fr",
            ],
            rowGap: ["1%", "2%", "3%", "4%"],
          }}
        >
          {apis.map((api, idx) => (
            <Card
              api={api}
              boxShadowOn
              redirectUrl={"ens/" + api.pointerUris[0]}
              key={idx + "-api"}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ApiGrid;

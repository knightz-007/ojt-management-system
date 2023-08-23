import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import CampaignFeature from "views/modules/campaign/CampaignFeature";
import CampaignGrid from "views/modules/campaign/CampaignGrid";
import CampaignItem from "views/modules/campaign/CampaignItem";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { v4 } from "uuid";

const ManagerDashboardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await axiosPrivate.get("/api/campaigns");
        console.log("fetchCampaigns ~ response", response);
      } catch (error) {
        console.log("fetchCampaigns ~ error", error);
      }
    }
    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <Heading number={2}>Affiliated Universities </Heading>
      <CampaignFeature></CampaignFeature>
      <Gap></Gap>
      <Heading number={10}>Current Available Courses </Heading>
      <CampaignGrid>
        {Array(4)
          .fill(0)
          .map((item) => (
            <CampaignItem key={v4()}></CampaignItem>
          ))}
      </CampaignGrid>
      <Gap></Gap>
    </Fragment>
  );
};

export default ManagerDashboardPage;
import { HStack } from "@chakra-ui/react";
import { OverviewTableTyped } from "../../components/UI";
import ChartFour from "../../components/UI/charts/ChartFour";
import ChartOne from "../../components/UI/charts/ChartOne";
import ChartThree from "../../components/UI/charts/ChartThree";
import ChartTwo from "../../components/UI/charts/ChartTwo";
import FilterByDateInput from "../../components/Users/FilterByDateInput";
import CardOne from "../../components/UI/cards/CardOne";
import CardTwo from "../../components/UI/cards/CardTwo";
import CardThree from "../../components/UI/cards/CardThree";
import CardFour from "../../components/UI/cards/CardFour";

const HomePage = () => {
  return     <>

{/* <OverviewTableTyped
headerTrailer={
    <HStack align="end">
      <FilterByDateInput onSelectDate={function (date: string): void {
        throw new Error("Function not implemented.");
      } } title={""} value={""}  />
      <FilterByDateInput onSelectDate={function (date: string): void {
        throw new Error("Function not implemented.");
      } } title={""} value={""} />
    </HStack>} currentPage={0} items={[]} title={""}>
    <div className="p-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardOne />
      <CardTwo />
      <CardThree />
      <CardFour />
    </div>

    <div className="px-2 mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <ChartOne />
      <ChartTwo />
      <ChartFour />
      <ChartThree />
    </div>
  </OverviewTableTyped> */}
</>;
};

export default HomePage;

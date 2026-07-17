import Hero from "../sections/Hero";
import ActRepetition from "../sections/ActRepetition";
import ProductWalkthrough from "../sections/ProductWalkthrough";
import ActWorkflow from "../sections/ActWorkflow";
import ActBeforeAfter from "../sections/ActBeforeAfter";
import ActBatchScale from "../sections/ActBatchScale";
import ActDownloadCTA from "../sections/ActDownloadCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ActRepetition />
      <ProductWalkthrough />
      <ActWorkflow />
      <ActBeforeAfter />
      <ActBatchScale />
      <ActDownloadCTA />
    </>
  );
}

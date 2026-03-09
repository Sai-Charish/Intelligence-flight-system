import { Suspense } from "react";
import FlightsPage from "./Flightpage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightsPage />
    </Suspense>
  );
}

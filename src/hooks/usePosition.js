import { useSearchParams } from "react-router-dom";

export function usePosition() {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  return { mapLat, mapLng };
}

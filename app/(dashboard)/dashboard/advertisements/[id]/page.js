// app/advertisement/[id]/page.js
import EditTextAdvertisementForm from "@/components/ads/EditTextAdvertisementForm";
import EditImageAdvertisementForm from "@/components/ads/EditImageAdvertisementForm";
import EditCodeAdvertisementForm from "@/components/ads/EditCodeAdvertisementForm";
import axios from "axios";

export const dynamic = "force-dynamic"; // Always fetch fresh data

async function getAdData(id) {
  const res = await axios.get(
    `http://localhost:3000/api/admin/advertisements/${id}`
  );
  const advertise = res.data;
  console.log("Single ad from {id} page.js: ",advertise);
  
  if (advertise === null) {
    throw new Error("Failed to fetch advertisement.");
  }

  return advertise;
}

const AdvertisementEditPage = async ({ params }) => {
  const { id } = await params;
  const ad = await getAdData(id);

  return (
    <div className="p-6">
      {ad.type === "text" && <EditTextAdvertisementForm adId={id} />}
      {ad.type === "image" && <EditImageAdvertisementForm adId={id} />}
      {ad.type === "code" && <EditCodeAdvertisementForm adId={id} />}
    </div>
  );
};

export default AdvertisementEditPage;

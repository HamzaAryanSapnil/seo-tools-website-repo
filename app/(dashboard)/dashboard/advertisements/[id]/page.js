// app/advertisement/[id]/page.js

import EditCodeAdvertisementForm from "@/components/AdvertisementsForms/Edit-Code-Ad-Form";
import EditImageAdvertisementForm from "@/components/AdvertisementsForms/Edit-Img-Ad-Form";
import EditTextAdvertisementForm from "@/components/AdvertisementsForms/Edit-Text-Ad-Form";
import axios from "axios";

export const dynamic = "force-dynamic"; // Always fetch fresh data

async function getAdData(id) {
  console.log("Fetching advertisement data for ID:", id);

  const res = await axios.get(
    `http://localhost:3000/api/admin/advertisements/${id}`
  );
  const advertise = res.data;
  console.log("Single ad from {id} page.js: ", advertise);

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
      {ad.type === "text" && (
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            Edit Text Advertisement
          </h1>
          <EditTextAdvertisementForm ad={ad} />{" "}
        </div>
      )}
      {ad.type === "image" && (
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            Edit Image Advertisement
          </h1>
          <EditImageAdvertisementForm ad={ad} />
        </div>
      )}
      {ad.type === "code" && (
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            Edit Code Advertisement
          </h1>
          <EditCodeAdvertisementForm ad={ad} />
        </div>
      )}
    </div>
  );
};

export default AdvertisementEditPage;

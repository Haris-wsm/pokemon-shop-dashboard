import ApiReq from "@/util/axios";

export async function handler(req, res, next) {
  if (req.method === "GET") {
    try {
      const response = await ApiReq.get("/categories");
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      // You can send an error response to the client here
      res.status(500).json({ error: "Failed to fetch data from API" });
    }
  }
}

const handler = async (req, res) => {
  try {
  } catch (err) {
    console.assert(process.env.NODE_ENV === "production", JSON.stringify(err));
    return res.status(400).json({ label: err.label || "Temporary server error" });
  }
};

export default handler;

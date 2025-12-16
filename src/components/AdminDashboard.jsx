const handleDeleteAll = async () => {
  const confirm = window.prompt("Type DELETE ALL to confirm");
  if (confirm !== "DELETE ALL") return;

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/admin/moods/delete-all`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    if (!res.ok) throw new Error("Delete failed");

    alert("All entries deleted successfully");
    setMoods([]);
  } catch (err) {
    alert("Failed to delete all entries");
    console.error(err);
  }
};

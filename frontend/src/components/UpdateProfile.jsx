import { useEffect, useState } from "react";
import api from "../api/api";

export default function UpdateProfile({setUpdateBtn}) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    api
      .get("/profiles", { params: { email: "rjsharma.rs967@gmail.com" } })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, subField, value) => {
    const updatedArray = [...profile[field]];
    updatedArray[index][subField] = value;
    setProfile({ ...profile, [field]: updatedArray });
  };

  const handleAddItem = (field, emptyObj) => {
    setProfile({ ...profile, [field]: [...profile[field], emptyObj] });
  };

  const handleRemoveItem = (field, index) => {
    setProfile({
      ...profile,
      [field]: profile[field].filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    try {
      const res = await api.put(`/profiles/${profile._id}`, profile);
      setProfile(res.data);
      alert("✅ Profile updated!");
      setUpdateBtn(false)
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <>
    
    <div className="p-6 bg-gray-100 rounded-lg mt-6 space-y-6">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>

     
      <input
        className="border p-2 rounded w-full mb-2"
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        className="border p-2 rounded w-full mb-2 bg-gray-200 text-gray-600 cursor-not-allowed"
        type="email"
        name="email"
        value={profile.email}
        disabled
      />

      <input
        className="border p-2 rounded w-full mb-2"
        type="text"
        name="skills"
        value={profile.skills?.join(", ")}
        onChange={(e) =>
          setProfile({
            ...profile,
            skills: e.target.value.split(",").map((s) => s.trim()),
          })
        }
        placeholder="Skills (comma separated)"
      />

   
      <div>
        <h3 className="font-semibold mb-2">Education</h3>
        {profile.education?.map((edu, i) => (
          <div key={i} className="border p-3 mb-2 rounded bg-white space-y-2">
            <input
              className="border p-1 rounded w-full"
              type="text"
              value={edu.school}
              onChange={(e) =>
                handleArrayChange("education", i, "school", e.target.value)
              }
              placeholder="School"
            />
            <input
              className="border p-1 rounded w-full"
              type="text"
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange("education", i, "degree", e.target.value)
              }
              placeholder="Degree"
            />
            <input
              className="border p-1 rounded w-full"
              type="number"
              value={edu.startYear}
              onChange={(e) =>
                handleArrayChange("education", i, "startYear", e.target.value)
              }
              placeholder="Start Year"
            />
            <input
              className="border p-1 rounded w-full"
              type="number"
              value={edu.endYear}
              onChange={(e) =>
                handleArrayChange("education", i, "endYear", e.target.value)
              }
              placeholder="End Year"
            />
            <textarea
              className="border p-1 rounded w-full"
              value={edu.details}
              onChange={(e) =>
                handleArrayChange("education", i, "details", e.target.value)
              }
              placeholder="Details"
            />
            <button
              className="text-red-600 text-sm"
              onClick={() => handleRemoveItem("education", i)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={() =>
            handleAddItem("education", {
              school: "",
              degree: "",
              startYear: "",
              endYear: "",
              details: "",
            })
          }
        >
          + Add Education
        </button>
      </div>

      
      <div>
        <h3 className="font-semibold mb-2">Projects</h3>
        {profile.projects?.map((p, i) => (
          <div key={i} className="border p-3 mb-2 rounded bg-white space-y-2">
            <input
              className="border p-1 rounded w-full"
              type="text"
              value={p.title}
              onChange={(e) =>
                handleArrayChange("projects", i, "title", e.target.value)
              }
              placeholder="Title"
            />
            <textarea
              className="border p-1 rounded w-full"
              value={p.description}
              onChange={(e) =>
                handleArrayChange("projects", i, "description", e.target.value)
              }
              placeholder="Description"
            />
            <input
              className="border p-1 rounded w-full"
              type="text"
              value={p.links.github}
              onChange={(e) =>
                handleArrayChange("projects", i, "links", {
                  ...p.links,
                  github: e.target.value,
                })
              }
              placeholder="GitHub Link"
            />
            <input
              className="border p-1 rounded w-full"
              type="text"
              value={p.links.demo}
              onChange={(e) =>
                handleArrayChange("projects", i, "links", {
                  ...p.links,
                  demo: e.target.value,
                })
              }
              placeholder="Demo Link"
            />
            <button
              className="text-red-600 text-sm"
              onClick={() => handleRemoveItem("projects", i)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={() =>
            handleAddItem("projects", {
              title: "",
              description: "",
              links: { github: "", demo: "", other: "" },
            })
          }
        >
          + Add Project
        </button>
      </div>

    
      <div>
        <h3 className="font-semibold mb-2">Work Experience</h3>
        {profile.work?.map((w, i) => (
          <div key={i} className="border p-3 mb-2 rounded bg-white space-y-2">
            <input
              className="border p-1 rounded w-full"
              type="text"
              value={w.company}
              onChange={(e) =>
                handleArrayChange("work", i, "company", e.target.value)
              }
              placeholder="Company"
            />
            <input
              className="border p-1 rounded w-full"
              type="text"
              value={w.role}
              onChange={(e) =>
                handleArrayChange("work", i, "role", e.target.value)
              }
              placeholder="Role"
            />
            <input
              className="border p-1 rounded w-full"
              type="date"
              value={w.startDate?.substring(0, 10)}
              onChange={(e) =>
                handleArrayChange("work", i, "startDate", e.target.value)
              }
            />
            <input
              className="border p-1 rounded w-full"
              type="date"
              value={w.endDate?.substring(0, 10)}
              onChange={(e) =>
                handleArrayChange("work", i, "endDate", e.target.value)
              }
            />
            <textarea
              className="border p-1 rounded w-full"
              value={w.description}
              onChange={(e) =>
                handleArrayChange("work", i, "description", e.target.value)
              }
              placeholder="Description"
            />
            <button
              className="text-red-600 text-sm"
              onClick={() => handleRemoveItem("work", i)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={() =>
            handleAddItem("work", {
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          + Add Work
        </button>
      </div>

     
      <div>
        <h3 className="font-semibold mb-2">Links</h3>
        <input
          className="border p-1 rounded w-full mb-2"
          type="text"
          value={profile.links.github}
          onChange={(e) =>
            setProfile({
              ...profile,
              links: { ...profile.links, github: e.target.value },
            })
          }
          placeholder="GitHub"
        />
        <input
          className="border p-1 rounded w-full mb-2"
          type="text"
          value={profile.links.linkedin}
          onChange={(e) =>
            setProfile({
              ...profile,
              links: { ...profile.links, linkedin: e.target.value },
            })
          }
          placeholder="LinkedIn"
        />
        <input
          className="border p-1 rounded w-full"
          type="text"
          value={profile.links.portfolio}
          onChange={(e) =>
            setProfile({
              ...profile,
              links: { ...profile.links, portfolio: e.target.value },
            })
          }
          placeholder="Portfolio"
        />
      </div>

    
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
    </>
  );
}

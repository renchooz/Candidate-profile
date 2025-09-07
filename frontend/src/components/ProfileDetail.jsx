import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProfileDetail() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/profiles", { params: { email: "rjsharma.rs967@gmail.com" } })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl space-y-6">
     
      <div>
        <h2 className="text-3xl font-bold">{profile.name}</h2>
        <p className="text-gray-600">{profile.email}</p>
      </div>

     
      <div>
        <h3 className="font-semibold text-lg mb-2">Skills:</h3>
        <div className="flex flex-wrap gap-2">
          {profile.skills?.map((skill, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      
      <div>
        <h3 className="font-semibold text-lg mb-2">Education:</h3>
        <ul className="list-disc list-inside space-y-1">
          {profile.education?.map((edu, i) => (
            <li key={i}>
              <p className="font-medium">{edu.degree}</p>
              <p>
                {edu.school} ({edu.startYear}–{edu.endYear})
              </p>
              {edu.details && <p className="text-gray-500">{edu.details}</p>}
            </li>
          ))}
        </ul>
      </div>

      
      <div>
        <h3 className="font-semibold text-lg mb-2">Projects:</h3>
        <ul className="space-y-3">
          {profile.projects?.map((p, i) => (
            <li key={i} className="border p-3 rounded-md bg-gray-50">
              <p className="font-medium text-blue-700">{p.title}</p>
              <p className="text-gray-700">{p.description}</p>
              <div className="mt-2 flex gap-3 flex-wrap">
                {p.links.github && (
                  <a
                    href={p.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {p.links.demo && (
                  <a
                    href={p.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {p.links.other && (
                  <a
                    href={p.links.other}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:underline"
                  >
                    Other
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      
      <div>
        <h3 className="font-semibold text-lg mb-2">Work Experience:</h3>
        <ul className="list-disc list-inside space-y-1">
          {profile.work?.map((w, i) => (
            <li key={i}>
              <p className="font-medium">{w.role}</p>
              <p>
                {w.company} (
                {w.startDate ? new Date(w.startDate).getFullYear() : ""}–
                {w.endDate ? new Date(w.endDate).getFullYear() : "Present"})
              </p>
              {w.description && (
                <p className="text-gray-500">{w.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Links:</h3>
        <div className="flex flex-wrap gap-3">
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              GitHub
            </a>
          )}
          {profile.links.linkedin && (
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline font-medium"
            >
              LinkedIn
            </a>
          )}
          {profile.links.portfolio && (
            <a
              href={profile.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline font-medium"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

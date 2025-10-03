import { useState, useEffect } from "react";
import PodcastPlayer from "./PodcastPlayer";
import KnowledgeGraph from "./KnowledgeGraph";
import ChatWidget from "./ChatWidget";
import { Link } from "react-router-dom";
import { getDriveFileId } from "../helper";
import PublicationSkeleton from "./PublicationLoader";
interface Author {
  name: string;
}

interface Tag {
  id: number | string;
  name: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface KnowledgeGaps {
  current_limitations: string[];
  research_needs: string[];
  future_directions: string[];
}

interface ScientificProgress {
  impact_on_field: string[];
  key_breakthroughs: string[];
  recent_advances: string[];
}

interface Consensus {
  areas_of_debate: string[];
  community_perspectives: string[];
  scientific_consensus: string[];
}

interface Publication {
  id?: number;
  title?: string;
  authors?: Author[];
  date_month?: string;
  date_year?: string;
  original_link?: string;
  environment?: string;
  tags?: Tag[];
  podcast_audio_path: string;
  summary_of_abstract?: string;
  summary_for_scientist?: string;
  summary_for_investor?: string;
  summary_for_mission_architect?: string;
  knowledge_gaps?: KnowledgeGaps;
  knowledgeable_insights?: ScientificProgress;
  consensus_disagreement?: Consensus;
  faqs?: FAQ[];
}

interface PublicationDetailProps {
  id: string | number;
}

const PublicationDetail: React.FC<PublicationDetailProps> = ({ id }) => {
  const [summaryType, setSummaryType] = useState<
    "scientist" | "investor" | "architect"
  >("scientist");
  const [showPopup, setShowPopup] = useState<
    "progress" | "gaps" | "consensus" | null
  >(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [publication, setPublication] = useState<Publication | null>(null);
  const [related, setRelated] = useState(null);

  const summaryContent: Record<typeof summaryType, string | undefined> = {
    scientist: publication?.summary_for_scientist,
    investor: publication?.summary_for_investor,
    architect: publication?.summary_for_mission_architect,
  };

  const faqItems: FAQ[] = publication?.faqs || [];

  const popupContent = {
    progress: {
      title: "Scientific Progress",
      content: [
        "Impact on field: ",
        ...(publication?.knowledgeable_insights?.impact_on_field ?? []),
        "Key Breakthroughs: ",
        ...(publication?.knowledgeable_insights?.key_breakthroughs ?? []),
        "Recent Advances: ",
        ...(publication?.knowledgeable_insights?.recent_advances ?? []),
      ].join("\n"),
    },
    gaps: {
      title: "Knowledge Gaps",
      content: [
        "Current Limitations: ",
        ...(publication?.knowledge_gaps?.current_limitations ?? []),
        "Research Needs: ",
        ...(publication?.knowledge_gaps?.research_needs ?? []),
        "Future Directions: ",
        ...(publication?.knowledge_gaps?.future_directions ?? []),
      ].join("\n"),
    },
    consensus: {
      title: "Consensus/Disagreement",
      content: [
        "Areas of Debate: ",
        ...(publication?.consensus_disagreement?.areas_of_debate ?? []),
        "Community Perspectives: ",
        ...(publication?.consensus_disagreement?.community_perspectives ?? []),
        "Scientific Consensus: ",
        ...(publication?.consensus_disagreement?.scientific_consensus ?? []),
      ].join("\n"),
    },
  };

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch(
          `https://www.syfuddhin.com/api/publications/${id}`
        );
        if (!response.ok) throw new Error("Fetching failed!");
        const result: Publication = await response.json();
        console.log(result);
        setPublication(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPublications();
  }, [id]);

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        const response = await fetch(
          `https://www.syfuddhin.com/api/publications/${id}/related`
        );
        if (!response.ok) throw new Error("Fetching failed!");
        const result = await response.json();

        setRelated(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRelatedData();
  }, [id]);

  let audio_file_id;
  if (publication) {
    audio_file_id = getDriveFileId(publication?.podcast_audio_path);
  }
  // console.log(publication);

  if (!publication) {
    return <PublicationSkeleton />;
  }
  return (
    <div className="publication-page">
      <div className="publication-container">
        {/* Header */}
        <div className="publication-header">
          <h1 className="publication-title">{publication?.title}</h1>
          <div className="publication-meta">
            <span className="text-sm">
              <span className="inline-block w-1.5 h-1.5 bg-white/10 rounded-full mr-2"></span>
              {publication?.authors
                ?.map((author) => `${author.name}`)
                .join(", ")}
            </span>
            <span> • </span>
            <span className="text-sm">
              {publication?.date_month} {publication?.date_year}
            </span>
            {publication?.original_link && (
              <Link
                to={publication.original_link}
                className="text-sm text-[#2fb2ff] hover:underline"
              >
                {publication?.environment}
              </Link>
            )}
          </div>
        </div>

        {/* Keywords Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4 gap-5">
            <h3 className="font-bold text-white"># Keywords</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {publication?.tags?.map((tag) => (
              <button key={tag.id} className="keyword-btn">
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <div className="publication-grid">
          {/* Left Column */}
          <div>
            {/* Summary */}
            <div className="publication-card">
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold">Summary</div>
                <div className="flex gap-2">
                  {(["scientist", "investor", "architect"] as const).map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setSummaryType(type)}
                        className={`px-3 py-1 text-xs rounded transition-all ${
                          summaryType === type
                            ? "bg-[#4ac7ff] text-[#0b1444] font-semibold"
                            : "bg-[#1e2a6e] border border-[#4ac7ff] text-[#d6efff] hover:bg-[#263891]"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div
                className="mb-4 p-4 rounded-lg border-l-4 border-[#2fb2ff]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(11,20,68,0.18), rgba(11,20,68,0.08))",
                }}
              >
                <strong>Abstract</strong>
                <div className="mt-2 text-sm text-[#d8f0ff]">
                  {publication?.summary_of_abstract}
                </div>
              </div>

              <p className="text-white/70 leading-relaxed">
                {summaryContent[summaryType]}
              </p>
            </div>

            {/* Audio Player */}
            {/* {publication && <PodcastPlayer
              title="Research Podcast: Quantum Error Correction Explained"
              src= {getDriveDownloadUrl(publication?.podcast_audio_path)}
              
            />} */}

            <div className="publication-card">
              <div className="font-bold mb-2">Podcast!</div>
              {publication?.podcast_audio_path && (
                <iframe
                  src={`https://drive.google.com/file/d/${audio_file_id}/preview`}
                  width="100%"
                  height="60"
                  allow="autoplay"
                ></iframe>
              )}
            </div>

            {/* Knowledge Graph Placeholder */}
            {/* <KnowledgeGraph /> */}
            {publication?.id && (
              <KnowledgeGraph publicationId={publication.id} />
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-4">
            {/* Action Tabs */}
            <div className="publication-card">
              {(["progress", "gaps", "consensus"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setShowPopup(type)}
                  className="w-full p-2 mb-2 text-center rounded-lg font-bold cursor-pointer transition-all duration-300 text-white/70 hover:text-[#60a8ff] hover:bg-white/5"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.012), rgba(255,255,255,0.007))",
                    border: "1px solid rgba(255,255,255,0.02)",
                  }}
                >
                  {type === "progress" && "Scientific Progress"}
                  {type === "gaps" && "Knowledge Gaps"}
                  {type === "consensus" && "Consensus/Disagreement"}
                </button>
              ))}
            </div>

            {/* FAQ */}
            <div className="publication-card">
              <div className="font-bold mb-3">Frequently Asked Questions</div>
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border-t border-white/5 py-4 cursor-pointer"
                >
                  <div
                    className="flex justify-between items-center text-white/70 font-semibold"
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === index ? null : index)
                    }
                  >
                    <span>{item.question}</span>
                    <span className="text-sm">
                      {expandedFAQ === index ? "−" : "+"}
                    </span>
                  </div>
                  {expandedFAQ === index && (
                    <div className="mt-3 text-sm text-[#eaf6ff]/90 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="publication-card">
              <div className="text-[#60a8ff] font-bold mb-2">Quick Links</div>
              <div className="space-y-2">
                {[
                  "Download PDF",
                  "Cite this paper",
                  "Related datasets",
                  "View code",
                ].map((link, index) => (
                  <a
                    key={index}
                    href={`${publication?.original_link}`}
                    className="block text-sm text-[#2fb2ff] hover:underline"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div className="publication-card">
              <div className="text-[#60a8ff] font-bold mb-2">
                Related Publications
              </div>
              <div className="space-y-2">
              {related &&
                related.map((post) => (
                  <div className="flex flex-col justify-between items-start gap-2 text-white/70 font-semibold p-1 border-b border-white/5 group cursor-pointer">
                    <Link className="text-xs group-hover:text-blue-500" to={`${post?.original_link}`}>{post?.title}</Link>
                    <span className="text-xs text-gray-400 group-hover:text-blue-600"> {post?.category?.title}, {post?.date_year}</span>
                  </div>
                ))}
            </div>
            </div>

            {/* Chat Input */}
            <ChatWidget publicationId={publication?.id} />
          </aside>
        </div>

        {/* Popup Overlays */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div
              className="bg-[rgba(20,30,70,0.95)] rounded-2xl p-6 border border-white/12 max-w-md w-[90%] max-h-[70vh] overflow-y-auto transform transition-all"
              style={{ boxShadow: "0 25px 80px rgba(5,10,30,0.9)" }}
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                <h3 className="text-lg font-bold text-[#60a8ff]">
                  {popupContent[showPopup].title}
                </h3>
                <button
                  onClick={() => setShowPopup(null)}
                  className="text-white/70 hover:text-white text-xl p-1 rounded transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="text-white/70 leading-relaxed">
                {popupContent[showPopup].content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationDetail;

import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  AreaChart,
  Area,
} from "recharts";
import {
  Layout,
  Users,
  Star,
  MessageSquare,
  Filter,
  ChevronRight,
  Info,
  Plane,
  Bed,
  Utensils,
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Wifi,
  MapPin,
  CheckCircle,
  Bus,
  Calendar,
  UserCheck,
  Award,
  BarChart2,
  User,
} from "lucide-react";

const App = () => {
  const [activeProgram, setActiveProgram] = useState("ALL");
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'sdm' | 'details'

  /**
   * DATA KUANTITATIF DETAIL (Dipecah per Tanggal/Batch)
   * Ditambahkan field 'Food' (Simulasi dari analisis teks) dan 'UstadzName'
   */
  const rawData = [
    // --- AL ULA SERIES ---
    {
      program: "UMROH PLUS AL ULA (13 Feb 2025)",
      ustadz: "Ust. Hudzaifah",
      ratings: {
        Pra: 2.9,
        Pesawat: 2.8,
        Food: 2.7,
        Bus: 2.8,
        HotelMakkah: 2.6,
        HotelMadinah: 2.8,
        Ibadah: 3.0,
        CityTour: 2.7,
      },
      month: "Feb",
    },
    {
      program: "UMROH PLUS AL ULA (23 Jan 2025)",
      ustadz: "Ust. Sansan",
      ratings: {
        Pra: 2.9,
        Pesawat: 2.9,
        Food: 2.2,
        Bus: 2.8,
        HotelMakkah: 2.2,
        HotelMadinah: 2.5,
        Ibadah: 2.9,
        CityTour: 2.8,
      },
      month: "Jan",
      note: "Isu Tas Serut & Makanan Hambar",
    },
    {
      program: "UMROH PLUS AL ULA (15 Juli 2025)",
      ustadz: "Ust. Arfan",
      ratings: {
        Pra: 3.0,
        Pesawat: 2.9,
        Food: 2.8,
        Bus: 3.0,
        HotelMakkah: 2.8,
        HotelMadinah: 2.8,
        Ibadah: 3.0,
        CityTour: 2.9,
      },
      month: "Jul",
    },

    // --- DUBAI SERIES ---
    {
      program: "UMROH PLUS DUBAI (03 Okt 2025)",
      ustadz: "Ust. Hudzaifah",
      ratings: {
        Pra: 2.9,
        Pesawat: 2.5,
        Food: 2.5,
        Bus: 2.8,
        HotelMakkah: 2.4,
        HotelMadinah: 2.5,
        Ibadah: 2.9,
        CityTour: 2.8,
      },
      month: "Okt",
      note: "Kecewa tidak ada Kereta Cepat",
    },

    // --- THAIF / SIROH SERIES ---
    {
      program: "UMROH HEART PLUS THAIF (31 Juli 2025)",
      ustadz: "Ust. Shubron",
      ratings: {
        Pra: 2.8,
        Pesawat: 2.7,
        Food: 2.7,
        Bus: 2.4,
        HotelMakkah: 2.7,
        HotelMadinah: 2.7,
        Ibadah: 3.0,
        CityTour: 2.5,
      },
      month: "Jul",
    },
    {
      program: "UMROH SIROH PLUS THAIF (02 April 2025)",
      ustadz: "Ust. Mubarok",
      ratings: {
        Pra: 2.9,
        Pesawat: 2.8,
        Food: 2.8,
        Bus: 2.9,
        HotelMakkah: 2.9,
        HotelMadinah: 2.8,
        Ibadah: 2.9,
        CityTour: 2.7,
      },
      month: "Apr",
    },
    {
      program: "UMROH MUAMALAH THAIF (22 Des 2025)",
      ustadz: "Ust. Erwandi",
      ratings: {
        Pra: 2.9,
        Pesawat: 2.7,
        Food: 2.7,
        Bus: 2.6,
        HotelMakkah: 2.7,
        HotelMadinah: 2.7,
        Ibadah: 3.0,
        CityTour: 2.7,
      },
      month: "Des",
    },

    // --- I'TIKAF RAMADHAN SERIES ---
    {
      program: "UMROH I'TIKAF RAMADHAN (20 Mar Batch 1)",
      ustadz: "Ust. Arfan",
      ratings: {
        Pra: 2.8,
        Pesawat: 2.7,
        Food: 2.3,
        Bus: 2.7,
        HotelMakkah: 2.0,
        HotelMadinah: 2.4,
        Ibadah: 2.9,
        CityTour: 2.2,
      },
      month: "Mar",
      note: "Kamar Sempit & Lift Antri",
    },
    {
      program: "UMROH I'TIKAF RAMADHAN (20 Mar Batch 2)",
      ustadz: "Ust. Arfan",
      ratings: {
        Pra: 2.0,
        Pesawat: 2.8,
        Food: 2.2,
        Bus: 2.5,
        HotelMakkah: 1.8,
        HotelMadinah: 2.3,
        Ibadah: 2.8,
        CityTour: 2.5,
      },
      month: "Mar",
      note: "Tim datang telat",
    },
    {
      program: "UMROH I'TIKAF RAMADHAN (19 Mar 2025)",
      ustadz: "Ust. Abu Sahl",
      ratings: {
        Pra: 2.9,
        Pesawat: 2.6,
        Food: 2.4,
        Bus: 2.8,
        HotelMakkah: 2.4,
        HotelMadinah: 2.4,
        Ibadah: 2.9,
        CityTour: 2.4,
      },
      month: "Mar",
    },

    // --- HEMAYA (BUDGET) ---
    {
      program: "UMROH HEMAYA (28 Jan 2025)",
      ustadz: "Ust. Abd Hamid",
      ratings: {
        Pra: 2.9,
        Pesawat: 2.7,
        Food: 2.8,
        Bus: 2.8,
        HotelMakkah: 2.5,
        HotelMadinah: 2.5,
        Ibadah: 2.9,
        CityTour: 2.1,
      },
      month: "Jan",
      note: "City Tour molor",
    },

    // --- PRIVATE SERIES ---
    {
      program: "UMROH PRIVATE (Ibu Sri - 18 Mar 2025)",
      ustadz: "Ust. Faruq",
      ratings: {
        Pra: 3.0,
        Pesawat: 2.8,
        Food: 2.4,
        Bus: 3.0,
        HotelMakkah: 2.5,
        HotelMadinah: 2.7,
        Ibadah: 3.0,
        CityTour: 2.9,
      },
      month: "Mar",
      note: "Hotel bintang 5 tapi menu monoton",
    },
    {
      program: "UMROH PRIVATE (02 April 2025)",
      ustadz: "Ust. Natan",
      ratings: {
        Pra: 2.9,
        Pesawat: 2.5,
        Food: 2.5,
        Bus: 2.9,
        HotelMakkah: 2.7,
        HotelMadinah: 2.8,
        Ibadah: 2.9,
        CityTour: 2.8,
      },
      month: "Apr",
    },
    {
      program: "UMROH PRIVATE (27 Maret 2025)",
      ustadz: "Ust. Hanif",
      ratings: {
        Pra: 2.8,
        Pesawat: 2.8,
        Food: 2.6,
        Bus: 3.0,
        HotelMakkah: 2.7,
        HotelMadinah: 2.6,
        Ibadah: 2.8,
        CityTour: 2.8,
      },
      month: "Mar",
    },
  ];

  // 1. CHART TREND BULANAN
  const trendData = [
    { name: "Jan", score: 2.85 },
    { name: "Feb", score: 2.92 },
    { name: "Mar", score: 2.62 }, // Drop krn I'tikaf
    { name: "Apr", score: 2.88 },
    { name: "Jul", score: 2.9 },
    { name: "Okt", score: 2.75 },
    { name: "Des", score: 2.85 },
  ];

  // 2. CHART KOMPARASI FASILITAS
  const facilityComparisonData = [
    { name: "Bimbingan", score: 2.95, fill: "#10b981" }, // High
    { name: "Bus/Trans", score: 2.8, fill: "#34d399" },
    { name: "Htl Madinah", score: 2.65, fill: "#fbbf24" },
    { name: "Htl Makkah", score: 2.42, fill: "#f87171" }, // Low
    { name: "Makanan", score: 2.35, fill: "#ef4444" }, // Lowest
  ];

  // 3. CHART Ustadz Rank (Aggregated per Ustadz)
  const ustadzRankData = [
    { name: "Ust. Erwandi", score: 3.0, count: 1 },
    { name: "Ust. Arfan", score: 2.98, count: 3 },
    { name: "Ust. Shubron", score: 2.95, count: 1 },
    { name: "Ust. Hudzaifah", score: 2.95, count: 2 },
    { name: "Ust. Abd Hamid", score: 2.9, count: 1 },
    { name: "Ust. Natan", score: 2.9, count: 1 },
    { name: "Ust. Sansan", score: 2.9, count: 1 },
  ];

  // 4. CHART DISTRIBUSI KELUHAN (Derived from keywords)
  const issueDistributionData = [
    { name: "Fasilitas Kamar (Sempit/AC)", value: 35, color: "#f87171" },
    { name: "F&B (Rasa/Antri)", value: 30, color: "#fb923c" },
    { name: "Transport/Transit", value: 20, color: "#fbbf24" },
    { name: "Perlengkapan (Tas)", value: 10, color: "#a78bfa" },
    { name: "Lainnya", value: 5, color: "#94a3b8" },
  ];

  // 5. DATA MATRIKS PRIORITAS
  const priorityMatrix = [
    {
      issue: "Variasi Makanan",
      urgency: "High",
      impact: "High",
      action: "Audit Vendor Katering & Tambah Corner Indonesia",
    },
    {
      issue: "Kapasitas Kamar Makkah",
      urgency: "High",
      impact: "High",
      action: "Review booking Triple/Quad di hotel Rehab/Emaar",
    },
    {
      issue: "Waktu City Tour",
      urgency: "Med",
      impact: "Med",
      action: "Strict departure time & Pindah jadwal ke pagi/malam",
    },
    {
      issue: "Kualitas Tas",
      urgency: "Med",
      impact: "Low",
      action: "Ganti vendor tas serut dengan bahan tebal",
    },
  ];

  // INSIGHT SPESIFIK (Tetap dipertahankan)
  const programInsights = {
    "UMROH PLUS AL ULA (23 Jan 2025)": {
      strengths: [
        "Ustadz Sansan humoris",
        "Respon cepat ganti koper tertinggal",
      ],
      weaknesses: [
        "Kualitas Tas Serut buruk (banyak jebol)",
        "Makanan Taiba Front hambar",
        "Old Town Al Ula 'cuma tempat nongkrong'",
      ],
    },
    "UMROH PLUS AL ULA (13 Feb 2025)": {
      strengths: [
        "Hotel Bintang 5 memuaskan",
        "Ustadz Hudzaifah sangat menguasai",
      ],
      weaknesses: [
        "Bus pulang ke Jeddah AC kurang dingin",
        "Kamar sempit untuk Quad",
      ],
    },
    "UMROH PLUS DUBAI (03 Okt 2025)": {
      strengths: ["Safari Desert seru", "Hotel Dubai mewah"],
      weaknesses: [
        "Transit tengah malam melelahkan",
        "Tidak ada Kereta Cepat (Kecewa)",
        "Flyer *4 ternyata Realita *3",
      ],
    },
    "UMROH I'TIKAF RAMADHAN (20 Mar Batch 1)": {
      strengths: ["Kajian Ustadz Arfan", "Suasana Lailatul Qadr"],
      weaknesses: [
        "Kamar 1217 Emaar sangat sempit (tidak layak Quad)",
        "Makanan sahur sering habis/telat",
      ],
    },
    "UMROH HEMAYA (28 Jan 2025)": {
      strengths: [
        "Fasilitas melebihi harga (Value)",
        "Ustadz Abdul Hamid mengayomi",
      ],
      weaknesses: [
        "City Tour Thaif molor (potong waktu sholat)",
        "Kurang tegas terhadap jamaah telat",
      ],
    },
    "UMROH PRIVATE (Ibu Sri - 18 Mar 2025)": {
      strengths: ["Handling bandara sangat membantu", "Privasi terjaga"],
      weaknesses: [
        "Menu makanan hotel monoton",
        "Kurang info teknis (Tag koper/makan)",
      ],
    },
    "UMROH HEART PLUS THAIF (31 Juli 2025)": {
      strengths: ["Materi Ustadz Shubron daging", "Respon cepat tim"],
      weaknesses: [
        "Driver Bus Thaif ugal-ugalan",
        "Bus jemputan kurang bersih",
      ],
    },
  };

  // --- CHART CONFIGURATION ---
  const categories = [
    { key: "Pra", label: "Pra-Safar" },
    { key: "Pesawat", label: "Flight" },
    { key: "Food", label: "F&B" },
    { key: "Bus", label: "Bus" },
    { key: "HotelMakkah", label: "Htl Makkah" },
    { key: "HotelMadinah", label: "Htl Madinah" },
    { key: "Ibadah", label: "Bimbingan" },
    { key: "CityTour", label: "Tour" },
  ];

  const radarData = useMemo(() => {
    if (activeProgram === "ALL") {
      return categories.map((cat) => {
        const total = rawData.reduce(
          (acc, curr) => acc + (curr.ratings[cat.key] || 0),
          0
        );
        const avg = (total / rawData.length).toFixed(2);
        return { subject: cat.label, A: parseFloat(avg), fullMark: 3 };
      });
    }
    const selected = rawData.find((p) => p.program === activeProgram);
    if (!selected) return [];
    return categories.map((cat) => ({
      subject: cat.label,
      A: selected.ratings[cat.key],
      fullMark: 3,
    }));
  }, [activeProgram]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold tracking-tight mb-1">
              <ClipboardCheck size={20} />
              <span>EL MARWA INTELLIGENCE</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Analisis Performa 2025
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              14 Batch Keberangkatan • Jan - Des 2025
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["overview", "sdm", "details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {tab === "overview" && "1. Overview & Trend"}
                {tab === "sdm" && "2. SDM & Layanan"}
                {tab === "details" && "3. Detail Program"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* --- TAB 1: OVERVIEW & TREND --- */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                icon={<TrendingUp size={24} />}
                bg="bg-emerald-500"
                label="Avg Satisfaction"
                val="2.85/3.0"
                sub="Stabil Tinggi"
              />
              <StatCard
                icon={<AlertTriangle size={24} />}
                bg="bg-red-500"
                label="Lowest Metric"
                val="Makanan"
                sub="Skor 2.35"
              />
              <StatCard
                icon={<Users size={24} />}
                bg="bg-blue-500"
                label="Total Batch"
                val="14 Grup"
                sub="Q1-Q4 2025"
              />
              <StatCard
                icon={<Star size={24} />}
                bg="bg-amber-500"
                label="Retention"
                val="High"
                sub="82% Sangat Puas"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SEGMENT 1: TREND BULANAN */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <LineChart size={20} className="text-blue-500" /> Trend
                    Kepuasan Bulanan
                  </h3>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                    Drop di Maret (I'tikaf)
                  </span>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient
                          id="colorScore"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <YAxis
                        domain={[2, 3]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* SEGMENT 2: KOMPARASI FASILITAS */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                  <BarChart2 size={20} className="text-amber-500" /> Vital
                  Metrics
                </h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={facilityComparisonData}
                      layout="vertical"
                      margin={{ left: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis type="number" domain={[0, 3]} hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={80}
                        tick={{
                          fontSize: 11,
                          fill: "#64748b",
                          fontWeight: 600,
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{ borderRadius: "8px" }}
                      />
                      <Bar
                        dataKey="score"
                        radius={[0, 4, 4, 0]}
                        barSize={24}
                        label={{
                          position: "right",
                          fill: "#64748b",
                          fontSize: 12,
                        }}
                      >
                        {facilityComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* SEGMENT 5: MATRIKS PRIORITAS */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <ClipboardCheck size={20} /> Action Plan Prioritas (Q2 2025)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {priorityMatrix.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 p-4 rounded-xl"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold">{item.issue}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.urgency === "High"
                            ? "bg-red-500"
                            : "bg-amber-500"
                        }`}
                      >
                        {item.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: SDM & LAYANAN --- */}
        {activeTab === "sdm" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SEGMENT 3: LEADERBOARD USTADZ */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                  <Award size={20} className="text-purple-500" /> Top Performer:
                  Ustadz Pembimbing
                </h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={ustadzRankData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#64748b",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                        interval={0}
                      />
                      <YAxis
                        domain={[2.8, 3.0]}
                        axisLine={false}
                        tickLine={false}
                        hide
                      />
                      <Tooltip contentStyle={{ borderRadius: "8px" }} />
                      <Bar
                        dataKey="score"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                      >
                        {ustadzRankData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index < 3 ? "#8b5cf6" : "#cbd5e1"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-center text-slate-400 mt-2">
                  *Berdasarkan rating rata-rata 'Bimbingan Ibadah' per batch
                </p>
              </div>

              {/* SEGMENT 4: DISTRIBUSI KELUHAN */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-red-500" /> Topik
                  Keluhan
                </h3>
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={issueDistributionData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {issueDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: "10px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center">
                    <span className="text-2xl font-black text-slate-800">
                      35%
                    </span>
                    <p className="text-xs text-slate-500 font-bold uppercase">
                      Fasilitas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEGMENT 6: VOLUME PROGRAM */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 text-lg mb-4">
                Sebaran Batch Program 2025
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-bold uppercase">
                    Reguler & Plus
                  </p>
                  <p className="text-xl font-black text-emerald-800">6 Batch</p>
                  <p className="text-xs text-emerald-600 mt-1">
                    Al Ula, Dubai, Thaif
                  </p>
                </div>
                <div className="flex-1 bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <p className="text-xs text-amber-600 font-bold uppercase">
                    Seasonal (Ramadhan)
                  </p>
                  <p className="text-xl font-black text-amber-800">3 Batch</p>
                  <p className="text-xs text-amber-600 mt-1">I'tikaf Series</p>
                </div>
                <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-600 font-bold uppercase">
                    Private & Custom
                  </p>
                  <p className="text-xl font-black text-blue-800">3 Batch</p>
                  <p className="text-xs text-blue-600 mt-1">Group Keluarga</p>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-600 font-bold uppercase">
                    Budget (Hemaya)
                  </p>
                  <p className="text-xl font-black text-slate-800">1 Batch</p>
                  <p className="text-xs text-slate-600 mt-1">Januari 2025</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: DETAIL PROGRAM (Revised Sidebar Layout) --- */}
        {activeTab === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* SIDEBAR LIST */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 h-[650px] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest shrink-0">
                  <Filter size={14} /> Pilih Batch Keberangkatan
                </label>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                <button
                  onClick={() => setActiveProgram("ALL")}
                  className={`w-full text-left p-3 rounded-xl transition-all border ${
                    activeProgram === "ALL"
                      ? "bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200 shadow-sm"
                      : "bg-white border-slate-100 hover:border-emerald-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activeProgram === "ALL"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <BarChart2 size={16} />
                      </div>
                      <div>
                        <span
                          className={`block text-sm font-bold ${
                            activeProgram === "ALL"
                              ? "text-emerald-800"
                              : "text-slate-700"
                          }`}
                        >
                          Rata-rata Gabungan
                        </span>
                        <span className="text-xs text-slate-400">
                          Semua Data 2025
                        </span>
                      </div>
                    </div>
                    {activeProgram === "ALL" && (
                      <CheckCircle size={18} className="text-emerald-500" />
                    )}
                  </div>
                </button>

                {rawData.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveProgram(p.program)}
                    className={`w-full text-left p-3 rounded-xl transition-all border group relative ${
                      activeProgram === p.program
                        ? "bg-white border-emerald-500 ring-1 ring-emerald-500 shadow-md z-10"
                        : "bg-white border-slate-100 hover:border-emerald-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          activeProgram === p.program
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {p.program.includes("(")
                          ? p.program.split("(")[1].replace(")", "")
                          : "N/A"}
                      </span>
                      {p.note && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                          <AlertTriangle size={10} /> Isu
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-sm font-bold mb-1 line-clamp-2 ${
                        activeProgram === p.program
                          ? "text-emerald-900"
                          : "text-slate-700"
                      }`}
                    >
                      {p.program.split("(")[0]}
                    </h4>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-50">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User size={10} />
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {p.ustadz}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RADAR & INSIGHT */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 min-h-[400px]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      Profil Kualitas Layanan
                    </h3>
                    <p className="text-sm text-slate-500">
                      {activeProgram === "ALL"
                        ? "Rata-rata seluruh 14 keberangkatan"
                        : activeProgram}
                    </p>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={radarData}
                    >
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fontSize: 11,
                          fill: "#64748b",
                          fontWeight: 600,
                        }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 3]}
                        tick={false}
                      />
                      <Radar
                        name="Skor"
                        dataKey="A"
                        stroke="#059669"
                        fill="#10b981"
                        fillOpacity={0.5}
                        strokeWidth={3}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {activeProgram !== "ALL" && programInsights[activeProgram] ? (
                <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg animate-in fade-in slide-in-from-bottom-4">
                  <h4 className="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <Info size={18} /> Highlight Batch Ini
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                        <ThumbsUp size={12} /> Hal Positif
                      </p>
                      <ul className="space-y-2">
                        {programInsights[activeProgram].strengths.map(
                          (s, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-start gap-2 text-slate-200"
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0"></span>{" "}
                              {s}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <p className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-1">
                        <ThumbsDown size={12} /> Keluhan Utama
                      </p>
                      <ul className="space-y-2">
                        {programInsights[activeProgram].weaknesses.map(
                          (w, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-start gap-2 text-slate-200"
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0"></span>{" "}
                              {w}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-medium">
                  Pilih salah satu program di sebelah kiri untuk melihat detail
                  spesifik.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-Component
const StatCard = ({ icon, bg, label, val, sub }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
    <div
      className={`${bg} p-3 rounded-xl shadow-lg shadow-slate-200 text-white`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-xl font-black text-slate-800 leading-none my-1">
        {val}
      </p>
      <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
    </div>
  </div>
);

export default App;

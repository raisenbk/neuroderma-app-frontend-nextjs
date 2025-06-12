// src/app/info/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Info, ArrowLeft } from 'lucide-react';
import DiseaseInfoAccordion from '@/components/DiseaseInfoAccordion';

// Data penyakit statis
const diseases = [
  {
    name: "Chickenpox",
    slug: "chickenpox",
    symptoms: `
Gejala cacar air biasanya muncul 10 hingga 21 hari setelah paparan virus. Periode prodromal (gejala awal sebelum timbulnya ruam) lebih sering terjadi pada remaja dan orang dewasa, dan dapat berupa nyeri otot, mual, penurunan nafsu makan, dan sakit kepala. Pada anak-anak, penyakit ini mungkin tidak didahului oleh gejala prodromal, dan tanda awalnya bisa berupa ruam atau lesi di rongga mulut.

Gejala utama cacar air meliputi:
- **Ruam yang gatal:** Ini adalah gejala paling khas. Ruam biasanya dimulai di dada, punggung, dan wajah, kemudian menyebar ke seluruh tubuh, termasuk kulit kepala, lengan, dan kaki. Ruam juga bisa muncul di selaput lendir, seperti di dalam mulut dan di area genital.
- **Demam:** Biasanya demam ringan hingga sedang (jarang lebih tinggi dari 39°C). Demam umumnya berlangsung selama 3 hingga 5 hari.
- **Kelelahan dan perasaan tidak enak badan (malaise):** Penderita sering merasa lemas dan tidak nyaman.
- **Sakit kepala:** Sering menyertai gejala lainnya.
- ** Nyeri tenggorokan (faringitis):** Dapat terjadi pada beberapa kasus.
- **Kehilangan selera makan**.

Ruam cacar air berkembang melalui beberapa tahap:
1. **Bintik-bintik merah atau benjolan (papula):** Muncul selama beberapa hari.
2. **Lepuh berisi cairan (vesikel):** Terbentuk dalam waktu sekitar satu hari dari papula, kemudian pecah dan mengeluarkan cairan. Cairan awalnya bening kemudian menjadi keruh.
3. **Koreng (krusta):** Menutupi lepuh yang sudah pecah dan membutuhkan beberapa hari lagi untuk sembuh. Koreng ini kemudian akan rontok.
Benjolan baru terus muncul selama beberapa hari, sehingga penderita mungkin memiliki benjolan, lepuh, dan koreng secara bersamaan. Rasa gatal yang ekstrem seringkali menjadi masalah utama dan dapat mengganggu tidur.
`,
    causes: `Cacar air disebabkan oleh:
- **infeksi primer virus Varicella-Zoster (VZV)**, yang merupakan anggota dari keluarga virus herpes (Herpesviridae). Virus ini juga dikenal sebagai human herpesvirus type 3. Setelah infeksi primer (cacar air), VZV tetap berada di dalam tubuh (di ganglia saraf sensorik) sebagai infeksi laten. Virus ini dapat aktif kembali bertahun-tahun kemudian menyebabkan herpes zoster (cacar ular).`,
    transmission: `Cacar air sangat menular. Virus ini menyebar dari orang ke orang melalui beberapa cara:

- **Kontak langsung:** Melalui sentuhan langsung dengan lepuh cacar air atau herpes zoster dari orang yang terinfeksi.
- **Udara (airborne):** Melalui inhalasi aerosol dari cairan vesikel lesi kulit cacar air atau herpes zoster. Virus ini juga dapat menyebar melalui sekresi pernapasan yang terinfeksi yang mungkin juga menjadi aerosol ketika orang yang terinfeksi batuk atau bersin.
- **Kontak dengan permukaan yang terkontaminasi:** Meskipun dianggap sebagai mekanisme penularan yang kurang signifikan dibandingkan kontak langsung atau udara, virus dapat menyebar melalui kontak dengan permukaan yang terkontaminasi cairan dari lepuh orang yang terinfeksi.
Seseorang dengan cacar air dapat menyebarkan virus mulai dari 1 hingga 2 hari sebelum ruam muncul hingga semua lepuh telah mengering dan membentuk koreng (biasanya 4-7 hari setelah timbulnya ruam).
`,
    prevention: `Cara paling efektif untuk mencegah cacar air adalah melalui vaksinasi. Vaksin cacar air sangat aman dan efektif dalam mencegah penyakit ini. Mayoritas orang yang mendapatkan vaksin tidak akan terkena cacar air. Jika seseorang yang telah divaksinasi tetap terkena cacar air (dikenal sebagai "breakthrough infection"), gejalanya biasanya jauh lebih ringan dengan lebih sedikit lepuh, demam ringan atau tanpa demam, dan pemulihan yang lebih cepat.

Selain vaksinasi, langkah-langkah pencegahan lainnya meliputi:

- **Menghindari kontak dekat** dengan orang yang terinfeksi cacar air atau herpes zoster sampai semua lesi mereka mengering.
- **Praktik kebersihan yang baik**, seperti mencuci tangan secara teratur, terutama setelah menyentuh benda atau permukaan yang mungkin terkontaminasi.
- **Isolasi orang yang terinfeksi:** Orang dengan cacar air harus tinggal di rumah dan menghindari kontak dengan orang lain, terutama mereka yang belum pernah terkena cacar air atau belum divaksinasi, sampai semua lepuh mereka mengering.
`,
    whenToSeeDoctor: `
Meskipun cacar air umumnya merupakan penyakit ringan pada anak-anak yang sehat, penting untuk menghubungi dokter jika Anda atau anak Anda menunjukkan gejala cacar air, terutama jika:

- ** Orang yang terinfeksi memiliki sistem kekebalan tubuh yang lemah** (misalnya, karena HIV/AIDS, kanker, transplantasi organ, atau penggunaan obat imunosupresif).
- **Orang yang terinfeksi adalah wanita hamil** yang belum pernah menderita cacar air atau belum divaksinasi.
- **Orang yang terinfeksi adalah bayi baru lahir** (kurang dari 1 bulan).
- **Orang yang terinfeksi adalah remaja atau orang dewasa**, karena penyakit ini cenderung lebih parah pada kelompok usia ini.
- **Ruam menyebar ke satu atau kedua mata.**
- **Ruam menjadi sangat merah, hangat, atau nyeri saat disentuh**, yang mungkin menandakan infeksi bakteri sekunder pada kulit.
- **Penderita mengalami gejala yang lebih serius**, seperti:
 - Kesulitan bernapas atau batuk parah (bisa menjadi tanda pneumonia).
 - Leher kaku, kebingungan, kesulitan berjalan, atau muntah terus-menerus (bisa menjadi tanda ensefalitis atau radang otak).
 - Demam yang sangat tinggi atau demam yang berlangsung lebih dari 4 hari.
 - Pendarahan atau memar yang tidak biasa.
 - Dehidrasi (mulut kering, sedikit atau tidak ada urin, pusing).

Dokter dapat mengkonfirmasi diagnosis, merekomendasikan perawatan untuk meredakan gejala, dan memantau kemungkinan komplikasi. Pada beberapa kasus, terutama pada individu berisiko tinggi, dokter mungkin meresepkan obat antivirus seperti asiklovir untuk mengurangi keparahan dan durasi penyakit jika diberikan dalam 24 jam pertama setelah timbulnya ruam.
`,
  },
  {
    name: "Measles",
    slug: "measles",
    symptoms: `Gejala campak biasanya muncul 7 hingga 14 hari setelah seseorang terinfeksi virus. Penyakit ini umumnya dimulai dengan gejala non-spesifik (periode prodromal) yang berlangsung selama 2-4 hari sebelum munculnya ruam khas campak.

  Gejala awal (prodromal) meliputi:

  - **Demam tinggi**: Seringkali merupakan gejala pertama dan bisa mencapai lebih dari 40°C.
  - **Tiga C (The three Cs)**:
    - **Batuk (Cough)**: Biasanya batuk kering dan persisten.
    - **Pilek (Coryza/Runny nose)**: Hidung meler dan tersumbat.
    - **Konjungtivitis (Conjunctivitis)**: Mata merah, berair, dan sensitif terhadap cahaya (fotofobia).
  - **Kelelahan dan perasaan tidak enak badan (Malaise)**.
  - **Bintik Koplik (Koplik's spots)**: Ini adalah tanda patognomonik (spesifik) untuk campak. Bintik-bintik kecil berwarna putih kebiruan dengan dasar kemerahan muncul di dalam mulut, pada selaput lendir pipi (mukosa bukal), biasanya berlawanan dengan gigi geraham bawah. Bintik ini muncul 1-2 hari sebelum ruam kulit dan berlangsung selama beberapa hari.

  Setelah periode prodromal, muncul **ruam makulopapular kemerahan (exanthem)**:
  - Ruam biasanya dimulai di wajah, di sekitar garis rambut dan di belakang telinga.
  - Kemudian menyebar ke bawah ke leher, batang tubuh, lengan, dan kaki dalam waktu 24-48 jam.
  - Ruam terdiri dari bintik-bintik merah kecil yang rata (makula) yang kemudian menjadi menonjol (papula). Bintik-bintik ini seringkali menyatu (koalesen) saat menyebar.
  - Ruam biasanya berlangsung selama 5-6 hari dan kemudian memudar dengan urutan yang sama seperti saat muncul, seringkali meninggalkan perubahan warna kecoklatan dan pengelupasan kulit.

  Demam biasanya memuncak saat ruam muncul dan mereda dalam beberapa hari setelahnya.
  `,
      causes: `Campak disebabkan oleh:

  - **infeksi virus campak (Measles morbillivirus)**, anggota genus Morbillivirus dalam keluarga Paramyxoviridae. Ini adalah virus RNA untai tunggal yang sangat menular. Manusia adalah satu-satunya reservoir alami untuk virus campak.`,
      transmission: `Campak adalah salah satu penyakit yang paling menular di dunia. Virus ini menyebar melalui:

  - **Udara (Airborne)**: Ketika orang yang terinfeksi batuk atau bersin, tetesan kecil (droplet) yang mengandung virus menyebar ke udara. Orang lain dapat terinfeksi dengan menghirup tetesan ini atau jika tetesan tersebut mendarat di permukaan dan kemudian disentuh oleh orang lain yang kemudian menyentuh mata, hidung, atau mulut mereka.
  - **Kontak langsung**: Dengan sekresi hidung atau tenggorokan dari orang yang terinfeksi.

  Virus campak dapat tetap aktif dan menular di udara atau pada permukaan yang terinfeksi hingga 2 jam. Seseorang dengan campak dapat menyebarkan virus mulai dari 4 hari sebelum hingga 4 hari setelah ruam muncul. Periode penularan tertinggi adalah selama periode prodromal (ketika gejala seperti batuk dan pilek muncul) sebelum ruam menjadi jelas.
  `,
      prevention: `Cara paling efektif untuk mencegah campak adalah melalui vaksinasi. Vaksin campak sangat aman dan efektif. Biasanya diberikan sebagai bagian dari vaksin kombinasi MMR (Measles, Mumps, Rubella) atau MMRV (Measles, Mumps, Rubella, Varicella).

  - **Vaksinasi Rutin**: WHO merekomendasikan dua dosis vaksin untuk semua anak. Dosis pertama biasanya diberikan pada usia 9-12 bulan di negara-negara dengan insiden campak tinggi, dan pada usia 12-15 bulan di negara-negara dengan insiden rendah. Dosis kedua biasanya diberikan antara usia 15-18 bulan atau saat masuk sekolah (4-6 tahun), tergantung pada jadwal imunisasi nasional.
  - **Vaksinasi Tanggap Darurat (Outbreak Response Immunization)**: Selama wabah, vaksinasi dapat diberikan kepada individu yang rentan untuk membantu mengendalikan penyebaran.
  - **Imunoglobulin (IG)**: Untuk individu yang rentan dan telah terpapar virus campak (misalnya, bayi, wanita hamil, orang dengan sistem kekebalan yang lemah), imunoglobulin dapat diberikan dalam waktu 6 hari setelah paparan untuk mencegah atau meringankan penyakit.
  
  Langkah-langkah pencegahan lainnya meliputi:

  - **Isolasi orang yang terinfeksi**: Orang dengan campak harus diisolasi selama 4 hari setelah timbulnya ruam untuk mencegah penyebaran lebih lanjut.
  - **Praktik kebersihan yang baik**: Meskipun penularan utama melalui udara, mencuci tangan dan menutupi mulut saat batuk atau bersin dapat membantu.
  - **Memastikan ventilasi yang baik di ruang publik**.
  `,
      whenToSeeDoctor: `
  Segera hubungi dokter jika Anda atau anak Anda:

  - **Mencurigai terkena campak**, terutama jika ada riwayat paparan atau belum divaksinasi lengkap.
  - **Mengalami gejala campak**, seperti demam tinggi disertai batuk, pilek, mata merah, dan kemudian muncul ruam.
  - **Termasuk dalam kelompok berisiko tinggi untuk komplikasi, seperti**:
    - **Bayi dan anak kecil** (di bawah usia 5 tahun).
    - **Orang dewasa di atas 20 tahun**.
    - **Wanita hamil**.
    - **Orang dengan sistem kekebalan tubuh yang lemah** (misalnya, karena leukemia, infeksi HIV, atau pengobatan imunosupresif).

  - **Mengalami salah satu dari komplikasi berikut**:
    - **Infeksi telinga (otitis media)**: Nyeri telinga, keluar cairan dari telinga.
    - **Diare berat**.
    - **Kesulitan bernapas atau nyeri dada (pneumonia)**: Ini adalah penyebab kematian terkait campak yang paling umum pada anak kecil.
    - **Tanda-tanda ensefalitis (radang otak)**: Sakit kepala hebat, leher kaku, kejang, kantuk berlebihan, kebingungan, atau koma. Ini adalah komplikasi serius yang dapat menyebabkan kerusakan otak permanen atau kematian.
    - **Dehidrasi**.
    - **Kejang yang disebabkan oleh demam**.

  Diagnosis dini penting untuk penanganan yang tepat dan untuk mencegah penyebaran lebih lanjut. Dokter akan mengkonfirmasi diagnosis dan merekomendasikan perawatan suportif untuk meredakan gejala dan memantau komplikasi. Tidak ada pengobatan antivirus spesifik untuk campak, tetapi suplemen vitamin A direkomendasikan oleh WHO untuk anak-anak dengan campak di daerah dengan kekurangan vitamin A, karena dapat mengurangi keparahan dan risiko kematian.
  `,
  },
  {
    name: "Monkeypox",
    slug: "monkeypox",
    symptoms: `Gejala Mpox umumnya muncul dalam 5 hingga 21 hari setelah terpapar virus. Gejala awal seringkali mirip flu, diikuti dengan munculnya ruam.

**Gejala Umum:**

- **Ruam**: Ini adalah gejala khas Mpox. Ruam biasanya dimulai di wajah dan menyebar ke seluruh tubuh, termasuk telapak tangan dan kaki. Ruam juga bisa muncul di area genital, mulut, atau tenggorokan. Ruam berkembang melalui beberapa tahap: bintik datar, kemudian lepuh berisi cairan (yang bisa gatal atau nyeri), lalu lepuh berisi nanah, mengeras menjadi keropeng, dan akhirnya rontok dalam 2 hingga 4 minggu. 
- **Demam** 
- **Sakit kepala** 
- **Nyeri otot dan punggung**
- **Pembengkakan kelenjar getah bening (limfadenopati)**: Ini adalah ciri pembeda utama Mpox dari penyakit lain seperti cacar air.
- **Kelelahan atau kekurangan energi**
- **Menggigil**
- **Sakit tenggorokan** 

Pada beberapa kasus, gejala pertama yang muncul adalah ruam, sementara yang lain mungkin mengalami demam atau nyeri otot terlebih dahulu. Beberapa orang mungkin juga mengalami peradangan rektum (proktitis), perdarahan rektum, atau nyeri saat buang air kecil (disuria) atau menelan.

**Komplikasi:**

Komplikasi serius dapat terjadi, termasuk infeksi bakteri sekunder pada kulit, pneumonia, sepsis, ensefalitis (infeksi otak), dan infeksi mata yang dapat menyebabkan kehilangan penglihatan.
`,
    causes: `Mpox disebabkan oleh infeksi virus Monkeypox (MPXV), yang termasuk dalam genus Orthopoxvirus dalam famili Poxviridae. Genus ini juga mencakup virus variola (penyebab cacar) dan virus vaccinia (digunakan dalam vaksin cacar). 

MPXV adalah virus DNA untai ganda. Virus ini bersifat zoonosis, artinya dapat ditularkan dari hewan ke manusia. (Anwar et al., 2023; Kumar et al., 2023) Meskipun disebut "monkeypox" karena pertama kali diidentifikasi pada monyet di laboratorium pada tahun 1958, monyet bukanlah reservoir utama virus ini. Diperkirakan hewan pengerat (rodentia) merupakan reservoir alami MPXV. 

Kasus pertama pada manusia dilaporkan pada tahun 1970 di Republik Demokratik Kongo.
`,
    transmission: `Penularan Mpox dapat terjadi melalui beberapa cara:

1. **Dari Hewan ke Manusia (Zoonosis)**:

- Kontak langsung dengan darah, cairan tubuh, atau lesi kulit atau mukosa dari hewan yang terinfeksi (seperti hewan pengerat dan primata). (Anwar et al., 2023; Lawal et al., 2024)
- Mengkonsumsi daging hewan liar yang terinfeksi yang tidak dimasak dengan baik. (WHO, n.d. - informasi umum, didukung oleh sifat zoonosis virus)

2. **Dari Manusia ke Manusia**:

- **Kontak dekat dengan lesi infeksius, keropeng, atau cairan tubuh**: Ini adalah rute utama penularan. Kontak bisa berupa sentuhan kulit-ke-kulit, termasuk selama aktivitas seksual. 
- **Droplet pernapasan**: Penularan melalui droplet pernapasan biasanya memerlukan kontak tatap muka yang lama dan dekat. 
- **Kontak dengan bahan yang terkontaminasi**: Seperti pakaian, tempat tidur, atau permukaan yang baru saja disentuh oleh orang yang terinfeksi.
- **Penularan vertikal (ibu ke anak)**: Virus dapat menular dari ibu ke janin selama kehamilan (Mpox kongenital) atau selama atau setelah persalinan melalui kontak dekat. 

Studi menunjukkan bahwa virus dapat terdeteksi dalam air liur, nasofaring, dan sperma untuk periode yang lama, dan ruam sering muncul di area genital, yang mendukung penularan melalui kontak seksual. Seseorang dianggap menularkan penyakit sampai semua lesi sembuh dan lapisan kulit baru terbentuk.
`,
    prevention: `Langkah-langkah pencegahan Mpox meliputi:

1. **Menghindari Kontak dengan Individu atau Hewan yang Terinfeksi**:
- Hindari kontak dekat, termasuk kontak kulit-ke-kulit dan seksual, dengan orang yang memiliki ruam yang mungkin merupakan Mpox atau yang telah didiagnosis Mpox.
- Hindari kontak dengan hewan yang mungkin terinfeksi virus (hewan yang sakit atau mati di daerah endemik Mpox).
- Hindari kontak dengan bahan yang telah bersentuhan dengan hewan atau manusia yang sakit (misalnya, tempat tidur, pakaian).

2. **Praktik Kebersihan yang Baik**:

- Sering mencuci tangan dengan sabun dan air atau menggunakan pembersih tangan berbasis alkohol, terutama setelah kontak dengan orang sakit atau lingkungannya. 

3. **Penggunaan Alat Pelindung Diri (APD)**:

- Petugas kesehatan dan orang lain yang merawat pasien Mpox harus menggunakan APD yang sesuai (gaun, masker, sarung tangan, pelindung mata).

4. **Isolasi Individu yang Terinfeksi**:

Orang dengan Mpox harus diisolasi untuk mencegah penularan lebih lanjut sampai semua lesi mereka sembuh dan lapisan kulit baru telah terbentuk. 

5. **Vaksinasi**:

- Vaksin yang digunakan untuk mencegah cacar juga memberikan perlindungan terhadap Mpox. Vaksin yang lebih baru khusus untuk Mpox juga telah dikembangkan (misalnya, JYNNEOS).

- Vaksinasi direkomendasikan untuk orang-orang yang berisiko tinggi terpapar, termasuk beberapa petugas kesehatan dan mereka yang telah terpapar virus. (CDC, 2023; Sagheddu et al., 2022)

6. **Kesadaran dan Pendidikan**:

- Meningkatkan kesadaran tentang risiko, gejala, dan rute penularan Mpox di masyarakat. 
`,
    whenToSeeDoctor: `
Segera cari pertolongan medis jika Anda:

- **Mengembangkan ruam baru yang tidak dapat dijelaskan**: Terutama jika ruam tersebut disertai dengan gejala mirip flu seperti demam, sakit kepala, nyeri otot, atau pembengkakan kelenjar getah bening. 
- **Mencurigai telah terpapar Mpox**: Jika Anda melakukan kontak dekat dengan seseorang yang didiagnosis Mpox atau memiliki gejala yang konsisten dengan Mpox. 
- **Memiliki gejala Mpox dan berisiko tinggi mengalami penyakit parah:** Ini termasuk orang dengan sistem kekebalan tubuh yang lemah, anak kecil, wanita hamil, dan orang dengan kondisi kulit yang sudah ada sebelumnya. 
- **Mengalami gejala yang parah**: Seperti kesulitan bernapas, kebingungan, dehidrasi, atau infeksi sekunder pada kulit. 
- **Ruam di area sensitif**: Seperti mata, mulut, atau area genital, yang menyebabkan nyeri hebat atau kesulitan makan/minum. 

Diagnosis dini penting untuk mendapatkan perawatan yang tepat, mencegah penyebaran lebih lanjut, dan memungkinkan pelacakan kontak. Dokter akan melakukan pemeriksaan fisik dan mungkin mengambil sampel dari lesi kulit untuk pengujian laboratorium guna mengkonfirmasi diagnosis.
`,
  },
];

async function getDiseaseBySlug(slug) {
  return diseases.find(disease => disease.slug === slug);
}

export default async function DiseasePage({ params }) {
  const slug = params.slug;
  if (!slug) notFound();

  const diseaseData = await getDiseaseBySlug(slug);

  if (!diseaseData) {
    return (
      <main className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Informasi Tidak Ditemukan</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Maaf, kami tidak dapat menemukan informasi untuk "{slug}".</p>
        <Link href="/" className="mt-6 inline-block bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 transition-colors">
          Kembali ke Beranda
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <header className="py-12 sm:py-16 bg-gradient-to-br from-sky-500 to-teal-400 dark:from-indigo-600 dark:to-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-4 bg-white/20 dark:bg-white/10 rounded-2xl mb-4">
            <Info className="w-12 h-12 mx-auto text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {diseaseData.name}
          </h1>
          <p className="mt-4 text-lg text-sky-100 dark:text-sky-200 max-w-3xl mx-auto">
            Informasi lengkap mengenai gejala, penyebab, dan cara pencegahan.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full">
          <DiseaseInfoAccordion data={diseaseData} />
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-3 bg-sky-600 dark:bg-sky-500 text-white font-bold rounded-full shadow-lg hover:bg-sky-700 dark:hover:bg-sky-400 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali ke Halaman Utama
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return diseases.map((disease) => ({
    slug: disease.slug,
  }));
}

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const diseaseData = await getDiseaseBySlug(slug);

  if (!diseaseData) {
    return {
      title: 'Informasi Penyakit Tidak Ditemukan',
      description: 'Halaman informasi penyakit yang Anda cari tidak ditemukan.',
    };
  }
  return {
    title: `Info Penyakit: ${diseaseData.name} - NeuroDerma`,
    description: `Pelajari tentang gejala, penyebab, penularan, pencegahan, dan kapan harus ke dokter untuk ${diseaseData.name}.`,
  };
}
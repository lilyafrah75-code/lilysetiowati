
import { GoogleGenAI } from "@google/genai";
import { RobotStrategy } from '../components/InstructionPanel';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateRobotSteps(instruction: string, strategy: RobotStrategy): Promise<string[]> {
  const strategyInstruction = strategy === 'batch'
    ? "Gunakan strategi 'Ambil Semua Dulu': Kumpulkan semua peralatan makan yang dibutuhkan dari Area Dapur terlebih dahulu. Setelah semua terkumpul, baru pergi ke Area Meja Makan untuk menata semuanya."
    : "Gunakan strategi 'Satu per Satu': Untuk setiap jenis peralatan makan, pergi ke Area Dapur, ambil barangnya, pergi ke Area Meja Makan, taruh barangnya, lalu ulangi untuk jenis barang berikutnya.";

  const prompt = `
    Anda adalah sebuah robot yang sangat logis dan hanya bisa mengikuti instruksi secara harfiah. 
    Berdasarkan perintah berikut, pecah menjadi daftar tindakan bernomor langkah demi langkah.
    Perintahnya adalah: "${instruction}".
    
    ${strategyInstruction}

    Tindakan yang bisa Anda lakukan terbatas pada: 
    - PERGI KE [LOKASI]
    - AMBIL [OBJEK]
    - TARUH [OBJEK] DI [LOKASI]
    
    Pastikan untuk mengambil semua peralatan makan yang relevan (piring, sendok, garpu, gelas) dari dapur dan menatanya dengan benar di meja makan.
    Berikan jawaban hanya dalam bentuk daftar bernomor yang jelas. Jangan tambahkan penjelasan atau teks lain.
    
    Contoh output untuk strategi 'Satu per Satu':
    1. PERGI KE Area Dapur
    2. AMBIL Piring
    3. PERGI KE Area Meja Makan
    4. TARUH Piring DI Meja Makan
    5. PERGI KE Area Dapur
    6. AMBIL Sendok
    ...dan seterusnya

    Contoh output untuk strategi 'Ambil Semua Dulu':
    1. PERGI KE Area Dapur
    2. AMBIL Piring
    3. AMBIL Sendok
    4. AMBIL Garpu
    5. PERGI KE Area Meja Makan
    6. TARUH Piring DI Meja Makan
    7. TARUH Sendok DI Meja Makan
    ...dan seterusnya
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
      }
    });
    
    const text = response.text;
    if (!text) {
      throw new Error("No response text from API.");
    }
    
    // Split the response by new lines, remove the numbering, and filter out empty lines.
    const steps = text
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0);
      
    return steps;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with Gemini API.");
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateInfluencer, UpdateInfluencer } from "src/influencers/types/influencer.type";

@Injectable()
export class InfluencersRepository {
  constructor(private db: PrismaService) {}

  async createInfluencer(data: CreateInfluencer) {
    const userData = {
      email: data.email,
      password: data.password,
      role: data.role,
    };
    const influencerData = {
      name: data.name,
      headline: data.headline,
    };
    const user = await this.db.user.create({ data: { ...userData } });
    const influencer = await this.db.influencer.create({
      data: { ...influencerData, userId: user.id },
    });
    return { ...influencer, email: user.email, role: user.role };
  }

  async update(id: number, data: UpdateInfluencer) {

    // 1. Dinamičko filtriranje podataka za Influencer-a
    const influencerData: Record<string, any> = {};

    // Polja koja pripadaju Influencer entitetu
    const possibleInfluencerFields = ['name', 'headline']; 
    
    for (const key of possibleInfluencerFields) {
        // Provera da li je polje prisutno i da li nije undefined
        const value = data[key as keyof UpdateInfluencer];
        
        if (value !== undefined) { 
            influencerData[key] = value;
        }
    }
    
    // 2. Provera da li uopšte imamo nešto za ažuriranje
    if (Object.keys(influencerData).length === 0) {
        // Vratite trenutni profil ako nema promena
        return this.db.influencer.findUnique({ where: { userId: id } });
    }

    // 3. Ažuriranje se izvršava samo JEDNOM
    const updatedInfluencer = await this.db.influencer.update({
        where: {
            userId: id 
        },
        data: influencerData
    });

    return updatedInfluencer;
}
}

import InfluencerCard from "./InfluencerCard";
import { SearchFilters } from "./SearchComponent";


export function SearchPage() {
return (


    <div className="space-y-6">
    
        <p className="pl-3"></p>
            <h1 className="text-4xl font-bold pl-4">Pronađite influensere za saradnju</h1>
        
        <SearchFilters />
    
        <div
            className="
                grid
                grid-cols-[repeat(auto-fit,minmax(350px,1fr))]
                gap-6
                justify-items-center
                mx-auto
                w-full
                max-w-7xl
                bg-backgroud
            "
        >
        {Array.from({ length: 18 }).map((_, index) => (
            <InfluencerCard key={index} />
        ))}
        </div>

    </div>
    
)
}

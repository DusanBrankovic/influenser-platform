import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { Area } from "@/components/businessarea.types";

const BusinessAreaItem = ({ area }: { area: Area }) => {
  return (
    <Card key={area.title}>
      <CardHeader>
        <CardTitle className="text-base">{area.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{area.description}</p>
      </CardContent>
    </Card>
  );
};

export default BusinessAreaItem;

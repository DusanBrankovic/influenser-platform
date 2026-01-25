import { useRouteContext } from "@tanstack/react-router";

export default function InfluencerPreview() {

    const { influencer } = useRouteContext({
        from: "/_private/profile/$userId"
      });

    return(
        <div>
            <p>Preview for influencer with id: {influencer.userId}</p>    
        </div>
    );
};

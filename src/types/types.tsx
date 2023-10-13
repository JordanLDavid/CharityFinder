import { ChangeEvent } from "react";

export interface Charity {
    ein : string;
    name : string;
    profileUrl : string;
    logoUrl : string;
    coverImageUrl : string;
    matchedTerms : string[];
    slugs : string;
    location : string;
    tags : string[];
}

export interface CharityResponse {
    nonprofits : Charity[];
}

export interface CharityDetails extends Charity {
    descriptionLong : string;
    description : string;
    websiteUrl : string;
}

export interface CharityDetailsResponse {
    data : {
        nonprofit : CharityDetails;
        nonprofitTags : [] 
    }
}

export interface SearchBarProp {
    input: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    filterData: string[];
}
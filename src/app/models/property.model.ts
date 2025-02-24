export interface PropertyModel {
    property_url: string;
    property_id: string;
    listing_id: string;
    mls: string;
    mls_id: string;
    status: string;
    text: string;
    style: string;

    full_street_line: string;
    street: string;
    unit: string;

    city: string;
    county: string;
    state: string;
    zip_code: number;

    beds: number;
    full_baths: number;
    half_baths: number;
    sqft: number;
    lot_sqft: number;
    year_built: number;

    days_on_mls: number;
    list_price: number;
    list_date: Date;

    assessed_value: number; 
    estimated_value: number;
    tax: number;
    tax_history: string[];
    
    price_per_sqft: number;
    
    latitude: number;
    longitude: number;
    
    hoa_fee: number;
    nearby_schools: string;

    primary_photo: string;

    rent: number;
}
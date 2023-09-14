// vendor-details.interface.ts
export interface VendorDetails {
    Name: string;
    Address: {
      Line1: string;
      Line2: string;
      CityState: string;
    };
    Contact: {
      Name: string;
      Number: string;
      Email: string;
      Website: string;
    };
    GSTNo: string;
    PANNo: string;
  }

  interface Item {
    SrNo: string;
    ProductName: string;
    Quantity: number;
    UnitPrice: number;
  }
  
  interface TaxDetails  {
    CGST: number;
    SGST:number
  }


  // purchase-order.interface.ts
 export interface PurchaseOrder {
    Date: Date;
    PONumber: string;
    Vendor: VendorDetails;
    ShipTo: VendorDetails; // Assuming ShipTo has the same structure as Vendor
    DeliveryMethod: string;
    PaymentTerms: string;
    DeliveryDate: string;
    AgainstQuoteNo: string;
    Items: Item[];
    Note: string;
    Discount:number;
    OtherCosts: number,
    TaxDetails:TaxDetails
  }


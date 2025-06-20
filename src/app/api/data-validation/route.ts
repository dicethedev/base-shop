// import type { NextRequest } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const requestData = await request.json();

//     // Extract data from the callback request
//     const email = requestData.requestedInfo?.email;
//     const physicalAddress = requestData.requestedInfo?.physicalAddress;
//     const phoneNumber = requestData.requestedInfo?.phoneNumber;
//     const name = requestData.requestedInfo?.name;

//     const errors: Record<string, any> = {};

//     // Email validation
//     if (email) {
//       if (email.endsWith("@example.com")) {
//         errors.email =
//           "Example.com emails are not allowed for security reasons";
//       }

//       // Reject disposable email domains
//       const disposableDomains = [
//         "tempmail.com",
//         "10minutemail.com",
//         "guerrillamail.com",
//       ];
//       if (disposableDomains.some((domain) => email.endsWith(`@${domain}`))) {
//         errors.email = "Disposable email addresses are not allowed";
//       }
//     }

//     // Physical address validation
//     if (physicalAddress) {
//       if (!errors.physicalAddress) errors.physicalAddress = {};

//       // Validate postal code length
//       if (physicalAddress.postalCode && physicalAddress.postalCode.length < 3) {
//         errors.physicalAddress.postalCode = "Postal code is too short";
//       }

//       const restrictedCountries = ["XY", "ZZ"];
//       if (restrictedCountries.includes(physicalAddress.countryCode)) {
//         errors.physicalAddress.countryCode =
//           "We don't currently ship to this country";
//       }

//       // Validate required address fields
//       if (
//         !physicalAddress.address1 ||
//         physicalAddress.address1.trim().length < 5
//       ) {
//         errors.physicalAddress.address1 =
//           "Street address is required and must be at least 5 characters";
//       }

//       if (!physicalAddress.city || physicalAddress.city.trim().length < 2) {
//         errors.physicalAddress.city = "City is required";
//       }

//       if (!physicalAddress.state || physicalAddress.state.trim().length < 2) {
//         errors.physicalAddress.state = "State/Province is required";
//       }
//     }

//     // Phone number validation
//     if (phoneNumber) {
//       if (!errors.phoneNumber) errors.phoneNumber = {};

//       if (phoneNumber.number && phoneNumber.number.length < 7) {
//         errors.phoneNumber.number = "Phone number is too short";
//       }
//     }

//     // Name validation
//     if (name) {
//       if (!errors.name) errors.name = {};

//       if (!name.firstName || name.firstName.trim().length < 1) {
//         errors.name.firstName = "First name is required";
//       }

//       if (!name.familyName || name.familyName.trim().length < 1) {
//         errors.name.familyName = "Last name is required";
//       }
//     }

//     // Clean up empty error objects
//     Object.keys(errors).forEach((key) => {
//       if (
//         typeof errors[key] === "object" &&
//         Object.keys(errors[key]).length === 0
//       ) {
//         delete errors[key];
//       }
//     });

//     // Return errors if any found
//     if (Object.keys(errors).length > 0) {
//       return Response.json({
//         errors,
//       });
//     }

//     // Success - no validation errors
//     // IMPORTANT: You MUST return the original calls for the transaction to proceed
//     return Response.json({
//       request: {
//         calls: requestData.calls,
//         chainId: requestData.chainId,
//         version: requestData.version,
//       },
//     });
//   } catch (error) {
//     console.error("Error processing data validation:", error);
//     return Response.json(
//       {
//         errors: {
//           server:
//             "Server error occurred while validating data. Please try again.",
//         },
//       },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  const requestData = await request.json();

  try {
    const email = requestData.requestedInfo.email;
    const physicalAddress = requestData.requestedInfo.physicalAddress;

    const errors: Record<string, any> = {};

    // Validate email
    if (email && email.endsWith("@example.com")) {
      errors.email = "Example.com emails are not allowed";
    }

    // Validate physical address
    if (physicalAddress) {
      errors.physicalAddress = {}; // ✅ Initialize this object first

      // Postal code validation
      if (
        physicalAddress.postalCode &&
        (physicalAddress.postalCode.length < 5 ||
          physicalAddress.postalCode.length > 10)
      ) {
        errors.physicalAddress.postalCode = "Invalid postal code format";
      }

      // Country validation
      if (physicalAddress.countryCode === "XY") {
        errors.physicalAddress.countryCode = "We don't ship to this country";
      }

      // City validation
      if (
        physicalAddress.city &&
        physicalAddress.city.toLowerCase() === "restricted"
      ) {
        errors.physicalAddress.city = "We don't ship to this city";
      }

      // Cleanup: remove physicalAddress if no errors inside it
      if (Object.keys(errors.physicalAddress).length === 0) {
        delete errors.physicalAddress;
      }
    }

    // If any errors exist, return them
    if (Object.keys(errors).length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    // Return success response
    return Response.json({
      request: {
        calls: requestData.calls,
        chainId: requestData.chainId,
        capabilities: requestData.capabilities,
      },
    });
  } catch (error) {
    console.error("Error processing data validation:", error);
    return Response.json(
      {
        errors: {
          server: "Server error validating data",
        },
      },
      { status: 500 }
    );
  }
}

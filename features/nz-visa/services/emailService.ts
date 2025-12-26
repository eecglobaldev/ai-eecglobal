import { BRANCH_DATA as BRANCHES } from '../data/branches';

// Firebase Cloud Functions URLs
const SEND_EMAIL_OTP_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/sendEmailOtpUSA";
const VERIFY_EMAIL_OTP_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/verifyEmailOtpUSA";
// const SEND_REGISTRATION_EMAILS_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/sendRegistrationEmailsUSA";
const SEND_REGISTRATION_EMAILS_UNIVERSAL_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/sendRegistrationEmailsUniversal";

export const sendEmailOtp = async (email: string, targetCountry: string = 'USA'): Promise<boolean> => {
  try {
    const response = await fetch(SEND_EMAIL_OTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        targetCountry: targetCountry,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error sending email OTP:', error);
    // Additional console log for errors
    if (error instanceof Error) {
      console.log('sendEmailOtp error message:', error.message);
      console.log('sendEmailOtp error stack:', error.stack);
    } else {
      console.log('sendEmailOtp error (non-Error object):', error);
    }
    return false;
  }
};

export const verifyEmailOtp = async (email: string, otp: string): Promise<boolean> => {
  try {
    const response = await fetch(VERIFY_EMAIL_OTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    // Additional console log for errors
    if (error instanceof Error) {
      console.log('verifyEmailOtp error message:', error.message);
      console.log('verifyEmailOtp error stack:', error.stack);
    } else {
      console.log('verifyEmailOtp error (non-Error object):', error);
    }
    return false;
  }
};

// Get counselor emails from a branch
// Accepts either branch identifier (ID) or branch name
export const getCounselorEmailsFromBranch = (branchIdentifierOrName: string): string[] => {
  // Try to find by identifier first (numeric ID)
  let branch = BRANCHES.find((b: { identifier: string; name: string }) => b.identifier === branchIdentifierOrName);
  
  // If not found by identifier, try to find by name
  if (!branch) {
    branch = BRANCHES.find((b: { identifier: string; name: string }) => b.name === branchIdentifierOrName);
  }
  
  if (!branch || !branch.counselors) {
    return [];
  }
  
  // Extract emails from counselors, filter out empty emails
  return branch.counselors
    .map((counselor: { email: string }) => counselor.email)
    .filter((email: string) => email && email.trim() !== '');
};

// Format user data for email (this will be used in {{message}} variable)
// Using pipe separator for plain text compatibility (no HTML tags)
// Now includes both registration data and academic plan data
const formatUserDataForEmail = (userData: any, academicPlan?: any): string => {
  let details = `\n=== REGISTRATION DETAILS ===\n`;
  details += `Name: ${userData.name || 'N/A'}\n`;
  details += `Email: ${userData.email || 'N/A'}\n`;
  details += `Phone: +91 ${userData.phone || 'N/A'}\n`;
  details += `State: ${userData.state || 'N/A'}\n`;
  details += `City: ${userData.city || 'N/A'}\n`;
  details += `Target Country: ${userData.targetCountry || 'N/A'}\n`;
  details += `EEC is Admissions Agent: ${userData.isEECAgent || 'N/A'}\n`;
  if (userData.isEECAgent === 'Yes' && userData.branch) {
    const branchName = typeof userData.branch === 'string' && !userData.branch.match(/^\d+$/) 
      ? userData.branch 
      : (BRANCHES.find((b: { identifier: string; name: string }) => b.identifier === userData.branch)?.name || userData.branch);
    details += `Selected Branch: ${branchName}\n`;
  }
  details += `Registration Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n`;
  
  // Add Academic Plan details if provided
  if (academicPlan) {
    details += `\n=== ACADEMIC PLAN DETAILS ===\n`;
    details += `US University: ${academicPlan.university || 'N/A'}\n`;
    details += `Course Level: ${academicPlan.courseLevel || 'N/A'}\n`;
    details += `Course: ${academicPlan.course || 'N/A'}\n`;
    details += `Last Qualification: ${academicPlan.lastQualification || 'N/A'}\n`;
    details += `Grade: ${academicPlan.grade || 'N/A'}\n`;
    details += `Indian University: ${academicPlan.indianUniversity || 'N/A'}\n`;
    
    // Sponsors
    if (academicPlan.sponsors && academicPlan.sponsors.length > 0) {
      details += `\nSponsors:\n`;
      academicPlan.sponsors.forEach((sponsor: any, index: number) => {
        details += `  Sponsor ${index + 1}: ${sponsor.type || 'N/A'}\n`;
        
        // Handle Parents - shows both father and mother
        if (sponsor.type === 'Parents') {
          if (sponsor.fatherOccupation) {
            details += `    Father Occupation: ${sponsor.fatherOccupation}\n`;
          }
          if (sponsor.fatherAnnualIncomeUSD) {
            details += `    Father Income (USD): ${sponsor.fatherAnnualIncomeUSD}\n`;
          }
          if (sponsor.motherOccupation) {
            details += `    Mother Occupation: ${sponsor.motherOccupation}\n`;
          }
          if (sponsor.motherAnnualIncomeUSD) {
            details += `    Mother Income (USD): ${sponsor.motherAnnualIncomeUSD}\n`;
          }
        }
        // Handle Father - shows only father details
        else if (sponsor.type === 'Father') {
          if (sponsor.fatherOccupation) {
            details += `    Occupation: ${sponsor.fatherOccupation}\n`;
          }
          if (sponsor.fatherAnnualIncomeUSD) {
            details += `    Annual Income (USD): ${sponsor.fatherAnnualIncomeUSD}\n`;
          }
          if (sponsor.fatherAnnualIncomeINR) {
            details += `    Annual Income (INR Lakhs): ${sponsor.fatherAnnualIncomeINR}\n`;
          }
        }
        // Handle Mother - shows only mother details
        else if (sponsor.type === 'Mother') {
          if (sponsor.motherOccupation) {
            details += `    Occupation: ${sponsor.motherOccupation}\n`;
          }
          if (sponsor.motherAnnualIncomeUSD) {
            details += `    Annual Income (USD): ${sponsor.motherAnnualIncomeUSD}\n`;
          }
          if (sponsor.motherAnnualIncomeINR) {
            details += `    Annual Income (INR Lakhs): ${sponsor.motherAnnualIncomeINR}\n`;
          }
        }
        // Handle Other Family Member
        else if (sponsor.type === 'Other Family Member') {
          if (sponsor.otherRelationship) {
            details += `    Relationship: ${sponsor.otherRelationship}\n`;
          }
          if (sponsor.otherOccupation) {
            details += `    Occupation: ${sponsor.otherOccupation}\n`;
          }
          if (sponsor.otherAnnualIncomeUSD) {
            details += `    Annual Income (USD): ${sponsor.otherAnnualIncomeUSD}\n`;
          }
          if (sponsor.otherAnnualIncomeINR) {
            details += `    Annual Income (INR Lakhs): ${sponsor.otherAnnualIncomeINR}\n`;
          }
        }
        // Handle Corporate or Government Sponsor
        else if (sponsor.type === 'Corporate Sponsor' || sponsor.type === 'Government Sponsor') {
          if (sponsor.sponsorName) {
            details += `    Sponsor Name: ${sponsor.sponsorName}\n`;
          }
        }
        // Handle University Scholarship
        else if (sponsor.type === 'University Scholarship') {
          if (sponsor.scholarshipType) {
            details += `    Scholarship Type: ${sponsor.scholarshipType}\n`;
          }
          if (sponsor.scholarshipAmountUSD) {
            details += `    Scholarship Amount (USD): ${sponsor.scholarshipAmountUSD}\n`;
          }
        }
        // Handle Graduate Assistantship
        else if (sponsor.type === 'Graduate Assistantship (TA/RA)') {
          if (sponsor.assistantshipDetails) {
            details += `    Assistantship Type: ${sponsor.assistantshipDetails}\n`;
          }
          if (sponsor.assistantshipWaiver) {
            details += `    Waiver: ${sponsor.assistantshipWaiver}\n`;
          }
          if (sponsor.assistantshipWaiverAmount) {
            details += `    Waiver Amount: ${sponsor.assistantshipWaiverAmount}\n`;
          }
          if (sponsor.hasStipend === 'Yes' && sponsor.stipendAmount) {
            details += `    Stipend Amount: ${sponsor.stipendAmount}\n`;
          }
        }
        // Handle Out-of-state tuition waiver
        else if (sponsor.type === 'Out-of-state tuition waiver') {
          if (sponsor.waiverAmount) {
            details += `    Waiver Amount: ${sponsor.waiverAmount}\n`;
          }
        }
      });
    }
    
    // Career Goals
    if (academicPlan.careerGoals) {
      details += `\nCareer Goals:\n`;
      details += `  Goal: ${academicPlan.careerGoals.goal || 'N/A'}\n`;
      details += `  Details: ${academicPlan.careerGoals.details || 'N/A'}\n`;
    }
    
    // Work Experience
    if (academicPlan.workExperience && academicPlan.workExperience.length > 0) {
      details += `\nWork Experience:\n`;
      academicPlan.workExperience.forEach((exp: any, index: number) => {
        details += `  Experience ${index + 1}: ${exp.type || 'N/A'} - ${exp.role || 'N/A'}\n`;
        details += `    Duration: ${exp.duration || 'N/A'}\n`;
        details += `    Description: ${exp.description || 'N/A'}\n`;
      });
    }
    
    // Test Scores
    if (academicPlan.testScores) {
      details += `\nTest Scores:\n`;
      const scores = academicPlan.testScores;
      
      // English Test Waivers
      const waivers: string[] = [];
      if (scores.waiverIB) {
        waivers.push('IB or Cambridge IGCSE');
      }
      if (scores.waiverIndianBoard) {
        waivers.push('CBSE/ICSE/State Board');
      }
      if (scores.waiverUniversity) {
        waivers.push('University Waiver');
      }
      
      if (waivers.length > 0) {
        details += `  English Test Waiver: ${waivers.join(', ')}\n`;
      }
      
      // Test Scores
      if (scores.ielts) details += `  IELTS: ${scores.ielts}\n`;
      if (scores.toefl) details += `  TOEFL: ${scores.toefl}\n`;
      if (scores.gre) details += `  GRE: ${scores.gre}\n`;
      if (scores.sat) details += `  SAT: ${scores.sat}\n`;
      if (scores.gmat) details += `  GMAT: ${scores.gmat}\n`;
      if (scores.pte) details += `  PTE: ${scores.pte}\n`;
      if (scores.duolingo) details += `  Duolingo: ${scores.duolingo}\n`;
      if (scores.otherTestName && scores.otherTestScore) {
        details += `  ${scores.otherTestName}: ${scores.otherTestScore}\n`;
      }
    }
    
    // Immigration History
    details += `\nImmigration History:\n`;
    details += `  Has Refusal: ${academicPlan.hasRefusal || 'no'}\n`;
    if (academicPlan.hasRefusal === 'yes') {
      details += `    Refusal Type: ${academicPlan.refusalType || 'N/A'}\n`;
      details += `    Refusal Reason: ${academicPlan.refusalReason || 'N/A'}\n`;
    }
    details += `  Has Traveled: ${academicPlan.hasTraveled || 'no'}\n`;
    if (academicPlan.hasTraveled === 'yes') {
      details += `    Travel Details: ${academicPlan.travelDetails || 'N/A'}\n`;
    }
    details += `  Has Petition: ${academicPlan.hasPetition || 'no'}\n`;
    if (academicPlan.hasPetition === 'yes') {
      details += `    Petition Details: ${academicPlan.petitionDetails || 'N/A'}\n`;
    }
    
    // Additional Details
    if (academicPlan.additionalDetails) {
      details += `\nAdditional Details: ${academicPlan.additionalDetails}\n`;
    }
  }
  
  return details;
};

// Build complete email body with header and footer
const buildCompleteEmailBody = (userData: any, academicPlan?: any, targetCountry: string = 'USA'): string => {
  let body = `New User Registration - ${targetCountry} Visa Prep\n\n`;
  
  // Registration Details Section
  body += "REGISTRATION DETAILS\n";
  body += "────────────────────────────────────────\n";
  body += `Name: ${userData.name || 'N/A'}\n`;
  body += `Email: ${userData.email || 'N/A'}\n`;
  body += `Phone: ${userData.phone || 'N/A'}\n`;
  body += `State: ${userData.state || 'N/A'}\n`;
  body += `City: ${userData.city || 'N/A'}\n`;
  body += `Target Country: ${targetCountry}\n`;
  body += `Visa Type: ${userData.visaType || 'N/A'}\n`;
  body += `Education Level: ${userData.educationLevel || 'N/A'}\n`;
  body += `Parent's Annual Income: ${userData.parentAnnualIncome || 'N/A'}\n`;
  body += `EEC is Admissions Agent: ${userData.isEECAgent || 'N/A'}\n`;
  
  if (userData.isEECAgent === 'Yes' && userData.branch) {
    const branchName = typeof userData.branch === 'string' && !userData.branch.match(/^\d+$/) 
      ? userData.branch 
      : (BRANCHES.find((b: { identifier: string; name: string }) => b.identifier === userData.branch)?.name || userData.branch);
    body += `Selected Branch: ${branchName}\n`;
  }
  
  const registrationDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata'
  });
  body += `Registration Date: ${registrationDate}\n\n`;
  
  // Academic Plan Details Section
  if (academicPlan) {
    body += "\n\nACADEMIC PLAN DETAILS\n";
    body += "────────────────────────────────────────\n";
    
    // New Zealand format fields
    if (academicPlan.institutionType) {
      body += `Institution Type: ${academicPlan.institutionType}\n`;
    }
    if (academicPlan.institutionName) {
      body += `Institution Name: ${academicPlan.institutionName}\n`;
    }
    if (academicPlan.courseLevel) {
      body += `Course Level: ${academicPlan.courseLevel}\n`;
    }
    if (academicPlan.courseName) {
      body += `Course Name: ${academicPlan.courseName}\n`;
    }
    if (academicPlan.previousEducation) {
      body += `Previous Education: ${academicPlan.previousEducation}\n`;
    }
    // Note: workExperience, careerGoals, and testScores are printed in detailed sections below
    if (academicPlan.usesFTS !== undefined) {
      body += `Using FTS: ${academicPlan.usesFTS ? 'Yes' : 'No'}\n`;
    }
    
    // USA format fields (for backward compatibility)
    if (academicPlan.university) {
      body += `US University: ${academicPlan.university}\n`;
    }
    if (academicPlan.course) {
      body += `Course: ${academicPlan.course}\n`;
    }
    if (academicPlan.lastQualification) {
      body += `Last Qualification: ${academicPlan.lastQualification}\n`;
    }
    if (academicPlan.grade) {
      body += `Grade: ${academicPlan.grade}\n`;
    }
    if (academicPlan.indianUniversity) {
      body += `Indian University: ${academicPlan.indianUniversity}\n`;
    }
    
    // Financial Dossier (New Zealand format)
    if (academicPlan.primarySponsor) {
      body += "\nFinancial Dossier:\n";
      body += `  Primary Sponsor: ${academicPlan.primarySponsor}\n`;
      if (academicPlan.sponsor1Name) {
        body += `  Sponsor 1 Name: ${academicPlan.sponsor1Name}\n`;
      }
      if (academicPlan.sponsor1Profession) {
        body += `  Sponsor 1 Profession: ${academicPlan.sponsor1Profession}\n`;
      }
      if (academicPlan.sponsor1Income) {
        body += `  Sponsor 1 Income: ${academicPlan.sponsor1Income}\n`;
      }
      if (academicPlan.sponsor2Name) {
        body += `  Sponsor 2 Name: ${academicPlan.sponsor2Name}\n`;
      }
      if (academicPlan.sponsor2Profession) {
        body += `  Sponsor 2 Profession: ${academicPlan.sponsor2Profession}\n`;
      }
      if (academicPlan.sponsor2Income) {
        body += `  Sponsor 2 Income: ${academicPlan.sponsor2Income}\n`;
      }
      if (academicPlan.fundingSources) {
        body += `  Funding Sources:\n`;
        if (academicPlan.fundingSources.familySavings) {
          body += `    Family Savings: ${academicPlan.fundingSources.familySavings}\n`;
        }
        if (academicPlan.fundingSources.educationLoan) {
          body += `    Education Loan: ${academicPlan.fundingSources.educationLoan}\n`;
        }
        if (academicPlan.fundingSources.personalSavings) {
          body += `    Personal Savings: ${academicPlan.fundingSources.personalSavings}\n`;
        }
      }
    }
    
    // Personal & Immigration History (New Zealand format)
    if (academicPlan.maritalStatus) {
      body += "\nPersonal & Immigration History:\n";
      body += `  Marital Status: ${academicPlan.maritalStatus}\n`;
      if (academicPlan.maritalStatus === 'Married') {
        if (academicPlan.dateOfMarriage) {
          body += `    Date of Marriage: ${academicPlan.dateOfMarriage}\n`;
        }
        if (academicPlan.marriageDurationInMonths !== null && academicPlan.marriageDurationInMonths !== undefined) {
          body += `    Marriage Duration (Months): ${academicPlan.marriageDurationInMonths}\n`;
        }
        if (academicPlan.spouseAccompanying) {
          body += `    Spouse Accompanying: ${academicPlan.spouseAccompanying}\n`;
        }
        if (academicPlan.spouseQualification) {
          body += `    Spouse Qualification: ${academicPlan.spouseQualification}\n`;
        }
        if (academicPlan.spouseExperience) {
          body += `    Spouse Experience: ${academicPlan.spouseExperience}\n`;
        }
        if (academicPlan.childrenAccompanying) {
          body += `    Children Accompanying: ${academicPlan.childrenAccompanying}\n`;
        }
        if (academicPlan.numberOfChildren) {
          body += `    Number of Children: ${academicPlan.numberOfChildren}\n`;
        }
        if (academicPlan.childrenAges) {
          body += `    Children Ages: ${academicPlan.childrenAges}\n`;
        }
      }
      if (academicPlan.hasVisaRefusal) {
        body += `  Has Visa Refusal: ${academicPlan.hasVisaRefusal}\n`;
        if (academicPlan.hasVisaRefusal === 'yes' && academicPlan.refusalReason) {
          body += `    Refusal Reason: ${academicPlan.refusalReason}\n`;
        }
      }
    }
    
    // Sponsors (USA format - for backward compatibility)
    if (academicPlan.sponsors && academicPlan.sponsors.length > 0) {
      body += "\nSponsors:\n";
      academicPlan.sponsors.forEach((sponsor: any, index: number) => {
        body += `  Sponsor ${index + 1}: ${sponsor.type || 'N/A'}\n`;
        
        if (sponsor.type === 'Parents') {
          if (sponsor.fatherOccupation) {
            body += `    Father Occupation: ${sponsor.fatherOccupation}\n`;
          }
          if (sponsor.fatherAnnualIncomeUSD) {
            body += `    Father Income (USD): ${sponsor.fatherAnnualIncomeUSD}\n`;
          }
          if (sponsor.motherOccupation) {
            body += `    Mother Occupation: ${sponsor.motherOccupation}\n`;
          }
          if (sponsor.motherAnnualIncomeUSD) {
            body += `    Mother Income (USD): ${sponsor.motherAnnualIncomeUSD}\n`;
          }
        } else if (sponsor.type === 'Father') {
          if (sponsor.fatherOccupation) {
            body += `    Occupation: ${sponsor.fatherOccupation}\n`;
          }
          if (sponsor.fatherAnnualIncomeUSD) {
            body += `    Annual Income (USD): ${sponsor.fatherAnnualIncomeUSD}\n`;
          }
          if (sponsor.fatherAnnualIncomeINR) {
            body += `    Annual Income (INR Lakhs): ${sponsor.fatherAnnualIncomeINR}\n`;
          }
        } else if (sponsor.type === 'Mother') {
          if (sponsor.motherOccupation) {
            body += `    Occupation: ${sponsor.motherOccupation}\n`;
          }
          if (sponsor.motherAnnualIncomeUSD) {
            body += `    Annual Income (USD): ${sponsor.motherAnnualIncomeUSD}\n`;
          }
          if (sponsor.motherAnnualIncomeINR) {
            body += `    Annual Income (INR Lakhs): ${sponsor.motherAnnualIncomeINR}\n`;
          }
        } else if (sponsor.type === 'Other Family Member') {
          if (sponsor.otherRelationship) {
            body += `    Relationship: ${sponsor.otherRelationship}\n`;
          }
          if (sponsor.otherOccupation) {
            body += `    Occupation: ${sponsor.otherOccupation}\n`;
          }
          if (sponsor.otherAnnualIncomeUSD) {
            body += `    Annual Income (USD): ${sponsor.otherAnnualIncomeUSD}\n`;
          }
          if (sponsor.otherAnnualIncomeINR) {
            body += `    Annual Income (INR Lakhs): ${sponsor.otherAnnualIncomeINR}\n`;
          }
        } else if (sponsor.type === 'Corporate Sponsor' || sponsor.type === 'Government Sponsor') {
          if (sponsor.sponsorName) {
            body += `    Sponsor Name: ${sponsor.sponsorName}\n`;
          }
        } else if (sponsor.type === 'University Scholarship') {
          if (sponsor.scholarshipType) {
            body += `    Scholarship Type: ${sponsor.scholarshipType}\n`;
          }
          if (sponsor.scholarshipAmountUSD) {
            body += `    Scholarship Amount (USD): ${sponsor.scholarshipAmountUSD}\n`;
          }
        } else if (sponsor.type === 'Graduate Assistantship (TA/RA)') {
          if (sponsor.assistantshipDetails) {
            body += `    Assistantship Type: ${sponsor.assistantshipDetails}\n`;
          }
          if (sponsor.assistantshipWaiver) {
            body += `    Waiver: ${sponsor.assistantshipWaiver}\n`;
          }
          if (sponsor.assistantshipWaiverAmount) {
            body += `    Waiver Amount: ${sponsor.assistantshipWaiverAmount}\n`;
          }
          if (sponsor.hasStipend === 'Yes' && sponsor.stipendAmount) {
            body += `    Stipend Amount: ${sponsor.stipendAmount}\n`;
          }
        } else if (sponsor.type === 'Out-of-state tuition waiver') {
          if (sponsor.waiverAmount) {
            body += `    Waiver Amount: ${sponsor.waiverAmount}\n`;
          }
        }
      });
    }
    
    // Career Goals (handle both USA object format and NZ string format)
    if (academicPlan.careerGoals) {
      body += "\nCareer Goals:\n";
      
      // Check if it's an object (USA format) or string (NZ format)
      if (typeof academicPlan.careerGoals === 'object' && academicPlan.careerGoals.goal) {
        // USA format - object with goal and details
        if (academicPlan.careerGoals.goal) {
          body += `  Goal: ${academicPlan.careerGoals.goal}\n`;
        }
        if (academicPlan.careerGoals.details) {
          body += `  Details: ${academicPlan.careerGoals.details}\n`;
        }
      } else if (typeof academicPlan.careerGoals === 'string') {
        // NZ format - simple string
        body += `  ${academicPlan.careerGoals}\n`;
      }
    }
    
    // Work Experience (handle both USA array format and NZ string format)
    if (academicPlan.workExperience) {
      body += "\nWork Experience:\n";
      
      // Check if it's an array (USA format) or string (NZ format)
      if (Array.isArray(academicPlan.workExperience)) {
        // USA format - array of work experience objects
        academicPlan.workExperience.forEach((exp: any, index: number) => {
          body += `  Experience ${index + 1}: ${exp.type || 'N/A'} - ${exp.role || 'N/A'}\n`;
          if (exp.duration) {
            body += `    Duration: ${exp.duration}\n`;
          }
          if (exp.description) {
            body += `    Description: ${exp.description}\n`;
          }
        });
      } else if (typeof academicPlan.workExperience === 'string') {
        // NZ format - simple string
        body += `  ${academicPlan.workExperience}\n`;
      }
    }
    
    // Test Scores (handle both USA object format and NZ string format)
    if (academicPlan.testScores) {
      body += "\nTest Scores:\n";
      
      // Check if it's an object (USA format) or string (NZ format)
      if (typeof academicPlan.testScores === 'object' && !Array.isArray(academicPlan.testScores)) {
        // USA format - object with individual test scores
        const scores = academicPlan.testScores;
        
        // English Test Waivers
        const waivers: string[] = [];
        if (scores.waiverIB) {
          waivers.push('IB or Cambridge IGCSE');
        }
        if (scores.waiverIndianBoard) {
          waivers.push('CBSE/ICSE/State Board');
        }
        if (scores.waiverUniversity) {
          waivers.push('University Waiver');
        }
        
        if (waivers.length > 0) {
          body += `  English Test Waiver: ${waivers.join(', ')}\n`;
        }
        
        // Test Scores
        if (scores.ielts) body += `  IELTS: ${scores.ielts}\n`;
        if (scores.toefl) body += `  TOEFL: ${scores.toefl}\n`;
        if (scores.gre) body += `  GRE: ${scores.gre}\n`;
        if (scores.sat) body += `  SAT: ${scores.sat}\n`;
        if (scores.gmat) body += `  GMAT: ${scores.gmat}\n`;
        if (scores.pte) body += `  PTE: ${scores.pte}\n`;
        if (scores.duolingo) body += `  Duolingo: ${scores.duolingo}\n`;
        if (scores.otherTestName && scores.otherTestScore) {
          body += `  ${scores.otherTestName}: ${scores.otherTestScore}\n`;
        }
      } else if (typeof academicPlan.testScores === 'string') {
        // NZ format - simple string
        body += `  ${academicPlan.testScores}\n`;
      }
    }
    
    // Immigration History (USA format - for backward compatibility)
    if (academicPlan.hasRefusal || academicPlan.hasTraveled || academicPlan.hasPetition) {
      body += "\nImmigration History:\n";
      body += `  Has Refusal: ${academicPlan.hasRefusal || 'no'}\n`;
      if (academicPlan.hasRefusal === 'yes') {
        if (academicPlan.refusalType) {
          body += `    Refusal Type: ${academicPlan.refusalType}\n`;
        }
        if (academicPlan.refusalReason) {
          body += `    Refusal Reason: ${academicPlan.refusalReason}\n`;
        }
      }
      body += `  Has Traveled: ${academicPlan.hasTraveled || 'no'}\n`;
      if (academicPlan.hasTraveled === 'yes' && academicPlan.travelDetails) {
        body += `    Travel Details: ${academicPlan.travelDetails}\n`;
      }
      body += `  Has Petition: ${academicPlan.hasPetition || 'no'}\n`;
      if (academicPlan.hasPetition === 'yes' && academicPlan.petitionDetails) {
        body += `    Petition Details: ${academicPlan.petitionDetails}\n`;
      }
    }
    
    // Additional Details
    if (academicPlan.additionalDetails) {
      body += `\nAdditional Details: ${academicPlan.additionalDetails}\n`;
    }
  }
  
  // Footer
  body += "\n\n────────────────────────────────────────\n";
  body += "TIP: To organize these emails, create a Gmail filter:\n";
  body += "1. Click the three dots (⋮) on this email\n";
  body += "2. Select \"Filter messages like this\"\n";
  body += "3. Click \"Create filter\"\n";
  body += `4. Check "Apply the label" and select/create "${targetCountry} Visa Prep"\n`;
  body += "5. Click \"Create filter\"\n";
  
  return body;
};

// Send registration notification emails (Universal - Pre-formatted)
// Formats complete email body in frontend and sends to universal Firebase Function
export const sendRegistrationNotificationEmailsUniversal = async (userData: any, academicPlan?: any): Promise<boolean> => {
  try {
    // console.log('📧 [emailService] Starting email notification...');
    // console.log('📧 [emailService] User data:', userData);
    
    // Get counselor emails if branch is selected
    const recipientEmails: string[] = [];
    
    if (userData.isEECAgent === 'Yes' && userData.branch) {
      // console.log('📧 [emailService] User selected a branch:', userData.branch);
      const counselorEmails = getCounselorEmailsFromBranch(userData.branch);
      // console.log('📧 [emailService] Counselor emails from branch:', counselorEmails);
      recipientEmails.push(...counselorEmails);
    } else {
      // console.log('📧 [emailService] No branch selected (isEECAgent:', userData.isEECAgent, ', branch:', userData.branch, ')');
    }
    
    // Always add the admin emails
    const adminEmails = [
      'amit.jalan@eecglobal.com',
      'madhav@eecglobal.com',
      'eecprexa@gmail.com',
      'eecbaroda@gmail.com',
      'eeccouns009@gmail.com',
      'eecnikolvisa@gmail.com',
      'eeccouns48@gmail.com',
      'eeccouns57@gmail.com'
    ];

    // const adminEmails = [
    //   'mohitkatare7620@gmail.com',
    //   'harshshrimali3003@gmail.com',
    // ];

    
    recipientEmails.push(...adminEmails);
    // console.log('📧 [emailService] Admin emails added:', adminEmails);
    
    // Remove duplicates
    const uniqueEmails = [...new Set(recipientEmails)];
    // console.log('📧 [emailService] Final recipient list (after deduplication):', uniqueEmails);
    
    if (uniqueEmails.length === 0) {
      // console.log('❌ [emailService] No recipients found, aborting email send');
      return false;
    }
    
    // Get target country for dynamic subject
    const targetCountry = String(userData.targetCountry || 'USA').trim();
    // console.log('📧 [emailService] Target country:', targetCountry);
    
    // Build complete email body (all formatting done in frontend)
    const emailBody = buildCompleteEmailBody(userData, academicPlan, targetCountry);
    // console.log('📧 [emailService] Email body prepared (length:', emailBody.length, 'chars)');
    
    // Build subject line
    const subject = `[${targetCountry} Visa Prep] New User Registration - ${targetCountry} Visa Prep`;
    // console.log('📧 [emailService] Email subject:', subject);
    
    // Send email via Universal Firebase Cloud Function
    try {
      // console.log('📨 [emailService] Calling Firebase Cloud Function:', SEND_REGISTRATION_EMAILS_UNIVERSAL_URL);
      const response = await fetch(SEND_REGISTRATION_EMAILS_UNIVERSAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: uniqueEmails,
          emailBody: emailBody,
          subject: subject,
        }),
      });
      
      // console.log('📨 [emailService] Response status:', response.status, response.statusText);
      const data = await response.json();
      // console.log('📨 [emailService] Response data:', data);
      
      if (data.success === true) {
        // console.log('✅ [emailService] Email sent successfully!');
        return true;
      } else {
        // console.log('⚠️ [emailService] Email send returned false:', data);
        return false;
      }
    } catch (error: any) {
      console.error('❌ [emailService] Error sending registration emails:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ [emailService] Outer catch - error:', error);
    // Don't throw error - registration should succeed even if email fails
    return false;
  }
};

// Send registration notification emails
// Now accepts both registration data and academic plan data
// export const sendRegistrationNotificationEmails = async (userData: any, academicPlan?: any): Promise<boolean> => {
//   try {
//     // Get counselor emails if branch is selected
//     const recipientEmails: string[] = [];
    
//     if (userData.isEECAgent === 'Yes' && userData.branch) {
//       const counselorEmails = getCounselorEmailsFromBranch(userData.branch);
//       recipientEmails.push(...counselorEmails);
//     }
    
//     // Always add the admin emails
//     const adminEmails = [
//       'mohitkatare7620@gmail.com',
//       'harshshrimali3003@gmail.com',
//       'mohitkatare762058@gmail.com',
//       'harshshrimali0002@gmail.com',
//     ];
    
//     recipientEmails.push(...adminEmails);



    
//     // Remove duplicates
//     const uniqueEmails = [...new Set(recipientEmails)];
    
//     if (uniqueEmails.length === 0) {
//       return false;
//     }
    
//     // Format user data for email (includes academic plan if provided)
//     const emailBody = formatUserDataForEmail(userData, academicPlan);
    
//     // Get branch name if applicable
//     let branchName = '';
//     if (userData.isEECAgent === 'Yes' && userData.branch) {
//       // Check if branch is already a name (not a numeric ID)
//       if (typeof userData.branch === 'string' && !userData.branch.match(/^\d+$/)) {
//         branchName = userData.branch;
//       } else {
//         branchName = BRANCHES.find(b => b.identifier === userData.branch)?.name || '';
//       }
//     }
    
//     const registrationDate = new Date().toLocaleString('en-IN', {
//       timeZone: 'Asia/Kolkata'
//     });
    
//     // Get target country for dynamic subject
//     const targetCountry = String(userData.targetCountry || 'USA').trim();
    
//     // Prepare user data for Firebase Function
//     const formattedUserData = {
//       name: String(userData.name || 'N/A').trim(),
//       email: String(userData.email || 'N/A').trim(),
//       phone: userData.phone ? `+91 ${String(userData.phone).trim()}` : 'N/A',
//       state: String(userData.state || 'N/A').trim(),
//       city: String(userData.city || 'N/A').trim(),
//       isEECAgent: String(userData.isEECAgent || 'N/A').trim(),
//       selectedBranch: branchName && branchName.trim() !== '' ? String(branchName).trim() : '',
//       registrationDate: String(registrationDate).trim(),
//     };
    
//     // Send email via Firebase Cloud Function
//     try {
//       const response = await fetch(SEND_REGISTRATION_EMAILS_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           recipients: uniqueEmails,
//           userData: formattedUserData,
//           academicPlan: academicPlan || null,
//           targetCountry: targetCountry,
//         }),
//       });
      
//       const data = await response.json();
//       return data.success === true;
//     } catch (error: any) {
//       console.error('Error sending registration emails:', error);
//       return false;
//     }
//   } catch (error) {
//     // Don't throw error - registration should succeed even if email fails
//     return false;
//   }
// };
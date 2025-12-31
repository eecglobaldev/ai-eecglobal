import React, { useState } from 'react';
import { ApplicationData } from '../types';

interface ApplicationInfoProps {
  applicationData?: ApplicationData;
  theme?: 'light' | 'dark';
}

// Helper function to safely parse JSON strings
const parseField = (field: any): any => {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return field;
    }
  }
  return field;
};

const ApplicationInfo: React.FC<ApplicationInfoProps> = ({ applicationData, theme = 'dark' }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true,
    course: true,
    academics: true,
    english: true,
    experience: true,
    immigration: true,
    family: true,
    financial: true,
    sop: true,
    declaration: true,
    documents: true,
    debug: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!applicationData) {
    return (
      <div className="bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-lg border border-glass-border">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Application Information</h3>
        <p className="text-sm text-gray-400">No application data available</p>
      </div>
    );
  }

  // Debug: Log available fields
  console.log('Application Data Keys:', Object.keys(applicationData));
  console.log('Application Data:', applicationData);

  // Parse all fields - Using correct field names from Firestore (camelCase)
  const personal = parseField(applicationData.personal);
  const courseSelection = parseField(applicationData.courseSelection);
  const academics = parseField(applicationData.academics);
  const englishProficiency = parseField(applicationData.englishProficiency);
  const experience = parseField(applicationData.experience);
  const immigration = parseField(applicationData.immigration);
  const family = parseField(applicationData.family);
  const financial = parseField(applicationData.financial);
  const sop = parseField(applicationData.sop);
  const declaration = parseField(applicationData.declaration);

  const InfoCard: React.FC<{ label: string; value: any; highlight?: boolean }> = ({ label, value, highlight }) => {
    if (!value || value === '""' || value === '') return null;
    return (
      <div className="bg-white/5 p-3 rounded-xl">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className={`text-sm font-medium ${highlight ? 'text-primary-purple' : ''}`}>{String(value)}</p>
      </div>
    );
  };

  const SectionHeader: React.FC<{ title: string; sectionKey: string; icon?: string }> = ({ title, sectionKey, icon }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between p-3 bg-primary-purple/20 rounded-xl hover:bg-primary-purple/30 transition-colors mb-3"
    >
      <h4 className="font-bold text-base flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h4>
      <span className="text-xl">{expandedSections[sectionKey] ? '−' : '+'}</span>
    </button>
  );

  return (
    <div className="bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-lg border border-glass-border">
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-primary-purple">📋 Application Information</h3>
      
      {/* Debug Section - Show available fields */}
      {/* <div className="mb-4">
        <button
          onClick={() => toggleSection('debug')}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          {expandedSections.debug ? '🔽' : '▶️'} Debug: Show Available Fields
        </button>
        {expandedSections.debug && (
          <div className="mt-2 bg-black/30 p-3 rounded-lg">
            <p className="text-xs text-green-400 mb-2 font-mono">Available Fields:</p>
            <pre className="text-[10px] text-gray-300 overflow-auto max-h-40">
              {JSON.stringify(Object.keys(applicationData), null, 2)}
            </pre>
          </div>
        )}
      </div> */}
      
      <div className="space-y-6">
        {/* Personal Information */}
        {personal && (
          <div>
            <SectionHeader title="Personal Information" sectionKey="personal" icon="👤" />
            {expandedSections.personal && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                <InfoCard label="Full Name" value={personal.fullName} highlight />
                <InfoCard label="Email" value={personal.email} />
                <InfoCard label="Phone" value={personal.phone} />
                <InfoCard label="Date of Birth" value={personal.dob} />
                <InfoCard label="Gender" value={personal.gender} />
                <InfoCard label="Nationality" value={personal.nationality} />
                <InfoCard label="Passport Number" value={personal.passport} />
                <InfoCard label="Address" value={personal.address} />
              </div>
            )}
          </div>
        )}

        {/* Course Selection */}
        {courseSelection && (
          <div>
            <SectionHeader title="Course Selection" sectionKey="course" icon="🎓" />
            {expandedSections.course && (
              <div className="grid grid-cols-1 gap-3 pl-2">
                <InfoCard label="Institution" value={courseSelection.institution} highlight />
                <InfoCard label="Course Name" value={courseSelection.courseName} highlight />
                <InfoCard label="Course Code" value={courseSelection.oshcCode} />
                <InfoCard label="Course Type" value={courseSelection.oshcType} />
                <InfoCard label="Campus" value={courseSelection.campus} />
                <InfoCard label="Duration" value={courseSelection.duration} />
                <InfoCard label="Start Date" value={courseSelection.startDate} />
                <InfoCard label="Living Cost (Year/AUD)" value={courseSelection.livingCostYearAUD} />
                <InfoCard label="Tuition (First Year AUD)" value={courseSelection.tuitionFirstYearAUD} />
                <InfoCard label="Travel Cost AUD" value={courseSelection.travelCostAUD} />
                {courseSelection.courseUnderstanding && (
                  <div className="bg-white/5 p-4 rounded-xl col-span-full">
                    <p className="text-xs text-gray-400 mb-2">Course Understanding</p>
                    <p className="text-sm leading-relaxed">{courseSelection.courseUnderstanding}</p>
                  </div>
                )}
                {courseSelection.livingUnderstanding && (
                  <div className="bg-white/5 p-4 rounded-xl col-span-full">
                    <p className="text-xs text-gray-400 mb-2">Living Understanding</p>
                    <p className="text-sm leading-relaxed">{courseSelection.livingUnderstanding}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Academic Background */}
        {academics && (
          <div>
            <SectionHeader title="Academic Background" sectionKey="academics" icon="📚" />
            {expandedSections.academics && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                <InfoCard label="School Name" value={academics.schoolName} />
                <InfoCard label="Class 10 Board" value={academics.class10Board} />
                <InfoCard label="Class 10 Grade" value={academics.class10Grade} highlight />
                <InfoCard label="Class 12 Board" value={academics.class12Board} />
                <InfoCard label="Class 12 Grade" value={academics.class12Grade} highlight />
                <InfoCard label="Class 12 Stream" value={academics.class12Stream} />
                <InfoCard label="Studied in Australia" value={academics.studiedAU} />
                <InfoCard label="Backlogs" value={academics.backlogs} />
                <InfoCard label="Admission English Waiver" value={academics.admissionEnglishWaiver ? 'Yes' : 'No'} />
              </div>
            )}
          </div>
        )}

        {/* English Proficiency */}
        {englishProficiency && englishProficiency.tests && englishProficiency.tests.length > 0 && (
          <div>
            <SectionHeader title="English Proficiency" sectionKey="english" icon="🗣️" />
            {expandedSections.english && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pl-2">
                <InfoCard label="Test" value={englishProficiency.tests[0].test} highlight />
                <InfoCard label="Overall" value={englishProficiency.tests[0].overall} highlight />
                <InfoCard label="Listening" value={englishProficiency.tests[0].ieltsL} />
                <InfoCard label="Reading" value={englishProficiency.tests[0].ieltsR} />
                <InfoCard label="Writing" value={englishProficiency.tests[0].ieltsW} />
                <InfoCard label="Speaking" value={englishProficiency.tests[0].ieltsS} />
                <InfoCard label="Test Date" value={englishProficiency.tests[0].testDate} />
                <InfoCard label="MOI Letter" value={englishProficiency.moiLetter ? 'Yes' : 'No'} />
              </div>
            )}
          </div>
        )}

        {/* Experience */}
        {experience && experience.experiences && experience.experiences.length > 0 && (
          <div>
            <SectionHeader title="Work Experience" sectionKey="experience" icon="💼" />
            {expandedSections.experience && (
              <div className="pl-2 space-y-3">
                <InfoCard label="Has Experience" value={experience.hasExperience === 'yes' ? 'Yes' : 'No'} />
                <InfoCard label="Gap Explanation" value={experience.hasGap === 'yes' ? 'Yes' : 'No'} />
                {experience.gapExplain && (
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Gap Explanation</p>
                    <p className="text-sm leading-relaxed">{experience.gapExplain}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Immigration */}
        {immigration && (
          <div>
            <SectionHeader title="Immigration History" sectionKey="immigration" icon="✈️" />
            {expandedSections.immigration && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                <InfoCard label="Traveled Abroad" value={immigration.traveledAbroad} />
                <InfoCard label="Marital Status" value={immigration.maritalStatus} />
                <InfoCard label="Breached Visa" value={immigration.breachedVisa} />
                <InfoCard label="Criminal Record" value={immigration.hasCriminalRecord} />
                <InfoCard label="Refused Entry" value={immigration.refusedAnywhere} />
                <InfoCard label="Medical Issues" value={immigration.hasMedicalIssues} />
                <InfoCard label="Applied to AU" value={immigration.appliedAU} />
              </div>
            )}
          </div>
        )}

        {/* Family Information */}
        {family && (
          <div>
            <SectionHeader title="Family Information" sectionKey="family" icon="👨‍👩‍👧‍👦" />
            {expandedSections.family && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                <InfoCard label="Father's Name" value={family.fatherName} />
                <InfoCard label="Father's Occupation" value={family.fatherOcc} />
                <InfoCard label="Father's Income" value={family.fatherIncome} />
                <InfoCard label="Mother's Name" value={family.motherName} />
                <InfoCard label="Mother's Occupation" value={family.motherOcc} />
                <InfoCard label="Mother's Income" value={family.motherIncome} />
                <InfoCard label="Relatives in AU" value={family.relativesInAU} />
                <InfoCard label="Own Assets" value={family.ownAsset} />
                <InfoCard label="Accommodation Plan" value={family.accommodationPlan} />
                {family.siblings && family.siblings.length > 0 && (
                  <div className="bg-white/5 p-4 rounded-xl col-span-full">
                    <p className="text-xs text-gray-400 mb-2">Siblings</p>
                    {family.siblings.map((sibling: any, idx: number) => (
                      <p key={idx} className="text-sm mb-1">
                        {sibling.name} - Age: {sibling.age}, Status: {sibling.status}
                      </p>
                    ))}
                  </div>
                )}
                {family.otherTies && (
                  <div className="bg-white/5 p-4 rounded-xl col-span-full">
                    <p className="text-xs text-gray-400 mb-2">Other Ties to India</p>
                    <p className="text-sm leading-relaxed">{family.otherTies}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Financial Information */}
        {financial && (
          <div>
            <SectionHeader title="Financial Information" sectionKey="financial" icon="💰" />
            {expandedSections.financial && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                <InfoCard label="Living Sponsor" value={financial.livingSponsor} highlight />
                <InfoCard label="Tuition Deposit Paid" value={financial.tuitionDepositPaid ? 'Yes' : 'No'} />
                <InfoCard label="Tuition Deposit Amount" value={financial.tuitionDepositAmount} />
                <InfoCard label="Receipt Number" value={financial.receiptNo} />
                <InfoCard label="Aware of Costs" value={financial.awareCosts ? 'Yes' : 'No'} />
                {financial.sponsors && financial.sponsors.length > 0 && (
                  <div className="bg-white/5 p-4 rounded-xl col-span-full">
                    <p className="text-xs text-gray-400 mb-3">Sponsors</p>
                    {financial.sponsors.map((sponsor: any, idx: number) => (
                      <div key={idx} className="mb-3 pb-3 border-b border-white/10 last:border-0">
                        <p className="text-sm font-semibold text-primary-purple">{sponsor.name} - {sponsor.relation}</p>
                        <p className="text-xs text-gray-400">
                          {sponsor.occupation} | Annual Income: ₹{sponsor.annualIncomeINR}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {financial.funding && financial.funding.length > 0 && (
                  <div className="bg-white/5 p-4 rounded-xl col-span-full">
                    <p className="text-xs text-gray-400 mb-2">Funding Sources</p>
                    <p className="text-sm">{financial.funding.join(', ')}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SOP Information */}
        {sop && (
          <div>
            <SectionHeader title="Statement of Purpose" sectionKey="sop" icon="📝" />
            {expandedSections.sop && (
              <div className="pl-2 space-y-3">
                {sop.whyThisInstitution && (
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Why This Institution?</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{sop.whyThisInstitution}</p>
                  </div>
                )}
                {sop.whyAustralia && (
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Why Australia?</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{sop.whyAustralia}</p>
                  </div>
                )}
                {sop.whyNotIndia && (
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Why Not India?</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{sop.whyNotIndia}</p>
                  </div>
                )}
                {sop.expectedSalaryInIndia && (
                  <InfoCard label="Expected Salary in India" value={sop.expectedSalaryInIndia} />
                )}
                {sop.extraMotivation && (
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Extra Motivation</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{sop.extraMotivation}</p>
                  </div>
                )}
                {sop.afterStudyPlan && (
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">After Study Plan</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{sop.afterStudyPlan}</p>
                  </div>
                )}
                {sop.targetRoles && (
                  <InfoCard label="Target Roles" value={sop.targetRoles} />
                )}
                {sop.careerBenefit && (
                  <InfoCard label="Career Benefit" value={sop.careerBenefit} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Declaration */}
        {/* {declaration && (
          <div>
            <SectionHeader title="Declaration" sectionKey="declaration" icon="✅" />
            {expandedSections.declaration && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                <InfoCard label="Date" value={declaration.date} />
                <InfoCard label="Agreed" value={declaration.agree ? 'Yes' : 'No'} highlight />
              </div>
            )}
          </div>
        )} */}

        {/* Document Links */}
        {/* {(applicationData.sopFileUrl || applicationData.transcriptUrl) && (
          <div>
            <SectionHeader title="Documents" sectionKey="documents" icon="📎" />
            {expandedSections.documents && (
              <div className="grid grid-cols-1 gap-3 pl-2">
                {applicationData.sopFileUrl && (
                  <a
                    href={applicationData.sopFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-purple/20 hover:bg-primary-purple/30 p-4 rounded-xl transition-colors flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium">📄 Statement of Purpose</span>
                    <span className="text-xs text-gray-400 group-hover:text-white">View →</span>
                  </a>
                )}
                {applicationData.transcriptUrl && (
                  <a
                    href={applicationData.transcriptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-purple/20 hover:bg-primary-purple/30 p-4 rounded-xl transition-colors flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium">📄 Transcript</span>
                    <span className="text-xs text-gray-400 group-hover:text-white">View →</span>
                  </a>
                )}
              </div>
            )}
          </div>
        )} */}

        {/* Timestamps */}
        {/* {(applicationData.createdAt || applicationData.updatedAt) && (
          <div className="pt-4 border-t border-glass-border">
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
              {applicationData.createdAt && (
                <div>
                  <span className="block mb-1">Created</span>
                  <span className="text-white">
                    {new Date(parseField(applicationData.createdAt).seconds * 1000).toLocaleString()}
                  </span>
                </div>
              )}
              {applicationData.updatedAt && (
                <div>
                  <span className="block mb-1">Updated</span>
                  <span className="text-white">
                    {new Date(parseField(applicationData.updatedAt).seconds * 1000).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ApplicationInfo;


import React, { useState } from 'react';
import { AcademicPlanData } from '../types';

interface AcademicPlanInfoProps {
  academicPlanData?: AcademicPlanData;
  theme?: 'light' | 'dark';
}

const AcademicPlanInfo: React.FC<AcademicPlanInfoProps> = ({ academicPlanData, theme = 'dark' }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    university: true,
    basic: true,
    tests: true,
    career: true,
    background: true,
    financial: true,
    work: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!academicPlanData) {
    return (
      <div className="bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-lg border border-glass-border">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Academic Plan Information</h3>
        <p className="text-sm text-gray-400">No academic plan data available</p>
      </div>
    );
  }

  const InfoCard: React.FC<{ label: string; value: any; highlight?: boolean; fullWidth?: boolean }> = ({ label, value, highlight, fullWidth }) => {
    if (!value || value === '""' || value === '' || value === 'None') return null;
    
    // Format boolean-like strings
    let displayValue = value;
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'yes') displayValue = '✅ Yes';
      if (value.toLowerCase() === 'no') displayValue = '❌ No';
    }
    
    return (
      <div className={`bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors ${fullWidth ? 'col-span-full' : ''}`}>
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className={`text-sm font-medium ${highlight ? 'text-primary-white' : ''}`}>{String(displayValue)}</p>
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

  const testScores = academicPlanData.testScores || {};
  const sponsors = academicPlanData.sponsors || [];
  const workExperience = academicPlanData.workExperience || [];
  
  // Helper to get field value - check top level first, then careerGoals
  const getField = (fieldName: string): any => {
    // Check top level first
    const topLevelValue = (academicPlanData as any)[fieldName];
    if (topLevelValue !== undefined && topLevelValue !== null && topLevelValue !== '') {
      return topLevelValue;
    }
    // Fallback to careerGoals if exists
    if (academicPlanData.careerGoals && (academicPlanData.careerGoals as any)[fieldName] !== undefined) {
      return (academicPlanData.careerGoals as any)[fieldName];
    }
    return null;
  };

  // Extract values with fallback to careerGoals
  const course = getField('course');
  const courseLevel = getField('courseLevel');
  const grade = getField('grade');
  const fundingSource = getField('fundingSource');
  const hasPetition = getField('hasPetition');
  const hasRefusal = getField('hasRefusal');
  const hasTraveled = getField('hasTraveled');

  return (
    <div className="bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-lg border border-glass-border">
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-primary-white">🎯 Academic Plan Information</h3>
      
      <div className="space-y-6">
        {/* University */}
        {academicPlanData.university && (
          <div>
            <SectionHeader title="Target University" sectionKey="university" icon="🏛️" />
            {expandedSections.university && (
              <div className="pl-2">
                <div className="bg-gradient-to-r from-primary-purple/30 to-primary-purple/10 p-4 rounded-xl border-l-4 border-primary-purple">
                  <p className="text-lg font-bold text-white">{academicPlanData.university}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Basic Information */}
        <div>
          <SectionHeader title="Course & Academic Details" sectionKey="basic" icon="📚" />
          {expandedSections.basic && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
              <InfoCard label="Course" value={course} />
              <InfoCard label="Course Level" value={courseLevel} />
              <InfoCard label="Grade/GPA" value={grade} />
              <InfoCard label="Funding Source" value={fundingSource} />
              <InfoCard label="Last Qualification" value={academicPlanData.lastQualification} />
              <InfoCard label="Previous Institution" value={academicPlanData.indianUniversity} />
            </div>
          )}
        </div>

        {/* Test Scores */}
        {(testScores.ielts || testScores.toefl || testScores.pte || testScores.duolingo || testScores.gre || testScores.gmat || testScores.sat) && (
          <div>
            <SectionHeader title="Test Scores" sectionKey="tests" icon="📝" />
            {expandedSections.tests && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pl-2">
                <InfoCard label="IELTS" value={testScores.ielts} />
                <InfoCard label="TOEFL" value={testScores.toefl} />
                <InfoCard label="PTE" value={testScores.pte} />
                <InfoCard label="Duolingo" value={testScores.duolingo} />
                <InfoCard label="GRE" value={testScores.gre} />
                <InfoCard label="GMAT" value={testScores.gmat} />
                <InfoCard label="SAT" value={testScores.sat} />
                {testScores.otherTestName && testScores.otherTestScore && (
                  <InfoCard label={testScores.otherTestName} value={testScores.otherTestScore} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Career Goals */}
        {academicPlanData.careerGoals && (academicPlanData.careerGoals.goal || academicPlanData.careerGoals.details) && (
          <div>
            <SectionHeader title="Career Goals" sectionKey="career" icon="🎯" />
            {expandedSections.career && (
              <div className="pl-2 space-y-3">
                {academicPlanData.careerGoals.goal && (
                  <div className="bg-gradient-to-r from-green-500/20 to-transparent p-4 rounded-xl border-l-4 border-green-500">
                    <p className="text-xs text-green-400 mb-2 font-semibold">🎯 Primary Goal</p>
                    <p className="text-base font-medium leading-relaxed">{academicPlanData.careerGoals.goal}</p>
                  </div>
                )}
                {academicPlanData.careerGoals.details && (
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Career Plan Details</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{academicPlanData.careerGoals.details}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Immigration & Travel */}
        <div>
          <SectionHeader title="Immigration & Travel History" sectionKey="background" icon="✈️" />
          {expandedSections.background && (
            <div className="pl-2 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <InfoCard label="Has Traveled" value={hasTraveled} />
                <InfoCard label="Has Refusal" value={hasRefusal} />
                <InfoCard label="Has Petition" value={hasPetition} />
              </div>
              {academicPlanData.travelDetails && (
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
                  <p className="text-xs text-blue-400 mb-2 font-semibold">Travel Details</p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{academicPlanData.travelDetails}</p>
                </div>
              )}
              {academicPlanData.refusalReason && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                  <p className="text-xs text-red-400 mb-2 font-semibold">Refusal Details</p>
                  <p className="text-sm mb-2"><strong>Type:</strong> {academicPlanData.refusalType}</p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{academicPlanData.refusalReason}</p>
                </div>
              )}
              {academicPlanData.petitionDetails && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
                  <p className="text-xs text-yellow-400 mb-2 font-semibold">Petition Details</p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{academicPlanData.petitionDetails}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Financial Sponsors */}
        {sponsors.length > 0 && (
          <div>
            <SectionHeader title="Financial Sponsors" sectionKey="financial" icon="💰" />
            {expandedSections.financial && (
              <div className="pl-2 space-y-4">
                {sponsors.map((sponsor: any, idx: number) => (
                  <div key={sponsor.id || idx} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary-purple/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-base font-bold text-primary-white">{sponsor.type}</p>
                        {sponsor.sponsorName && <p className="text-sm text-gray-300">{sponsor.sponsorName}</p>}
                      </div>
                      {sponsor.scholarshipType && sponsor.scholarshipType !== 'None' && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          {sponsor.scholarshipType} Scholarship
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                      {sponsor.fatherOccupation && (
                        <InfoCard label="Father's Occupation" value={sponsor.fatherOccupation} />
                      )}
                      {sponsor.fatherAnnualIncomeUSD && (
                        <InfoCard label="Father's Income (USD)" value={`$${sponsor.fatherAnnualIncomeUSD}`} />
                      )}
                      {sponsor.fatherAnnualIncomeINR && (
                        <InfoCard label="Father's Income (INR)" value={`₹${sponsor.fatherAnnualIncomeINR} Lakhs`} />
                      )}
                      {sponsor.motherOccupation && (
                        <InfoCard label="Mother's Occupation" value={sponsor.motherOccupation} />
                      )}
                      {sponsor.motherAnnualIncomeUSD && (
                        <InfoCard label="Mother's Income (USD)" value={`$${sponsor.motherAnnualIncomeUSD}`} />
                      )}
                      {sponsor.motherAnnualIncomeINR && (
                        <InfoCard label="Mother's Income (INR)" value={`₹${sponsor.motherAnnualIncomeINR} Lakhs`} />
                      )}
                      {sponsor.otherOccupation && (
                        <InfoCard label={`${sponsor.otherRelationship}'s Occupation`} value={sponsor.otherOccupation} />
                      )}
                      {sponsor.otherAnnualIncomeUSD && (
                        <InfoCard label={`${sponsor.otherRelationship}'s Income (USD)`} value={`$${sponsor.otherAnnualIncomeUSD}`} />
                      )}
                      {sponsor.scholarshipAmountUSD && (
                        <InfoCard label="Scholarship Amount" value={`$${sponsor.scholarshipAmountUSD}`} />
                      )}
                      {sponsor.assistantshipWaiver && sponsor.assistantshipWaiver !== 'None' && (
                        <InfoCard label="Assistantship Waiver" value={sponsor.assistantshipWaiver} />
                      )}
                      {sponsor.hasStipend && sponsor.hasStipend !== 'No' && (
                        <InfoCard label="Stipend" value={sponsor.stipendAmount ? `$${sponsor.stipendAmount}` : 'Yes'} />
                      )}
                    </div>
                    
                    {sponsor.assistantshipDetails && (
                      <div className="mt-3 bg-white/5 p-3 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Assistantship Details</p>
                        <p className="text-sm">{sponsor.assistantshipDetails}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <SectionHeader title="Work Experience" sectionKey="work" icon="💼" />
            {expandedSections.work && (
              <div className="pl-2 space-y-3">
                {workExperience.map((work: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-sm font-bold text-primary-white mb-2">{work.position || work.title}</p>
                    <p className="text-sm text-gray-300 mb-1">{work.company}</p>
                    <p className="text-xs text-gray-400">{work.duration || `${work.startDate} - ${work.endDate}`}</p>
                    {work.description && (
                      <p className="text-sm text-gray-300 mt-2">{work.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Additional Details */}
        {academicPlanData.additionalDetails && academicPlanData.additionalDetails !== '""' && (
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
            <p className="text-xs text-blue-400 mb-2 font-semibold">📝 Additional Details</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{academicPlanData.additionalDetails}</p>
          </div>
        )}

        {/* Timestamp */}
        {academicPlanData.timestamp && (
          <div className="pt-4 border-t border-glass-border">
            <p className="text-xs text-gray-400">
              Last Updated: {new Date(academicPlanData.timestamp || 0).toLocaleString('en-US', { 
                dateStyle: 'medium', 
                timeStyle: 'short' 
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicPlanInfo;


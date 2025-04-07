import CaseEditForm from '@/app/Components/CaseEditForm';
import Case from '@/models/caseModel';
import viewCase from '@/models/viewCase';

export default async function Page({ params }) {
    const { CIN } = await params;
    const currCaseData = await viewCase(0, CIN);
    const caseData = currCaseData[0];
    
    return(
        <div>
            <CaseEditForm caseData={caseData} />
        </div>
    );

}

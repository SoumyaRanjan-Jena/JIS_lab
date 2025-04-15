import CaseEditForm from '@/app/Components/CaseEditForm';
import { headers } from 'next/headers';

export default async function Page({ params }) {
    const { CIN } = await params;
    const baseUrl = await headers().get('host'); // works inside server functions
    const res = await fetch(`http://${baseUrl}/api/view-cases?type=0&data=${CIN}`);
    const result = await res.json();
    const caseData = result[0];
    
    return(
        <div>
            <CaseEditForm caseData={caseData} />
        </div>
    );

}

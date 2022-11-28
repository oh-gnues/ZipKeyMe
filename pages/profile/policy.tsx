import type {NextPage} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";

const Policy: NextPage = () => {
	return (
		<Layout title={"개인정보 처리방침"} hasTabBar canGoBack>
			<Head><title>개인정보 처리방침</title></Head>
			<div>
				{[1, 1, 1, 1, 1].map((_, i) => (
					<div>
						<p className="text-xl font-bold px-3 py-3">제1장 총칙</p>
						<p className="text-lg font-bold px-3 py-2">제1조 (목적)</p>
						<p className="text-base px-3 py-1">
							이 약관은 디비디비딥(이하 “회사”)가 제공하는 모든 서비스(이하 “서비스”)를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
						</p>
						<p className="text-lg font-bold px-3 py-2">제2조 (용어의 정의)</p>
						<p className="text-base px-3 py-1">
							이 약관에서 사용하는 용어의 정의는 다음 각 호와 같으며, 정의되지 않은 용어에 대한 해석은 관계법령 및 서비스 별 안내에서 정하는 바에 따릅니다.
						</p>
						<p className="text-base px-3 py-1">
							① 회원 : 사이트와 서비스 이용계약을 체결하거나 이용자 아이디(ID)를 부여받은 개인 또는 단체를 말합니다. <br />
							② 신청자 : 회원가입을 신청하는 개인 또는 단체를 말합니다. <br />
							③ 아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이 정하고 사이트가 승인하는 문자와 숫자의 조합을 말합니다. <br />
							④ 비밀번호 : 회원이 부여 받은 아이디(ID)와 일치된 회원임을 확인하고, 회원 자신의 비밀을 보호하기 위하여 회원이 정한 문자와 숫자의 조합을 말합니다. <br />
							⑤ 해지 : 사이트 또는 회원이 서비스 이용계약을 취소하는 것을 말합니다.
						</p>

						<p className="text-xl font-bold px-3 py-3">제2장 서비스 이용계약</p>
						<p className="text-lg font-bold px-3 py-2">
							제4조 (이용계약의 성립)
						</p>
						<p className="text-base px-3 py-1">
							① 이용약관 하단의 동의 버튼을 누르면 이 약관에 동의하는 것으로 간주됩니다. <br />
							② 이용계약은 서비스 이용희망자의 이용약관 동의 후 이용 신청에 대하여 사이트가 승낙함으로써 성립합니다.
						</p>
						<p className="text-lg font-bold px-3 py-2">제5조 (이용신청)</p>
						<p className="text-base px-3 py-1">
							① 신청자가 본 서비스를 이용하기 위해서는 사이트 소정의 가입신청 양식에서 요구하는 이용자 정보를 기록하여 제출해야 합니다. <br />
							② 가입신청 양식에 기재하는 모든 이용자 정보는 모두 실제 데이터인 것으로 간주됩니다. 실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를 받을 수 없으며, 서비스의 제한을 받을 수 있습니다.
						</p>
					</div>
				))}
			</div>
		</Layout>
	);
}

export default Policy;
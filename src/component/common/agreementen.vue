<template lang="pug">
.useragreement(@click="hiddenself")
    .navigationbar
            span.navigation-title User agreement
            .closeimg
    .useragreecontent
        
        div
            b 《Zero zero steam & trade; EPC query system user registration protocol.》
        p   This agreement is for you and the 2000auto &trade; EPC query system (hereinafter referred to as "auto - trade;" (hereinafter referred to as "cloud auto distribution &trade;") ) between the two parties: Products and services and other related matters to enter into a contract, please read carefully the registration agreement, you click on the "I have read and accept the zero zero steam & trade; EPC query system user license agreement" button, after this agreement is a legal document binding upon both parties.
        
        div
            b   Zero zero steam & trade; Confirmation and acceptance of service terms.
        p  Zero zero steam & trade; The ownership and operation rights of the various data query services will be merged with the steam distribution &trade. All. Users agree to all the terms and conditions of the registration agreement and complete the registration and product activation procedures to become the 2004 auto &trade; Regular users. User confirmation: this agreement shall be governed by the contract of rights and obligations of the parties hereto, and shall remain in force, unless otherwise mandatory or otherwise agreed by the parties.
        p  If the user agrees to this agreement, it shall be deemed as a user to confirm that he/she is enjoying the same. Data query service and other corresponding rights and behaviors, can independently assume legal responsibility.
        p  Cloud and steam distribution &trade; Reserves the right to independently decide on/offline brand, refuse service, close user account, clear or edit content within the scope of law permitted by the mainland of the People's Republic of China.
        
        div
            b   Zero zero steam & trade; service
        p   Zero zero steam & trade; The Internet provides users with Internet information and other services through the Internet, and users fully agree with this agreement and the auto industry. In the case of the relevant provisions, the party shall have the right to use the 2000ac &trade; Related services.
        p   Users must prepare the following equipment and bear the expenses in the paper are as follows: (1) Internet equipment, including but not limited to computers or other Internet terminals, modems and other necessary Internet access device; (2) online expenditure, including not limited to network access fee, Internet equipment rental fee, mobile phone traffic fee, etc.
        p   Zero zero steam & trade; It is currently supported in a variety of system environments and is recommended for firefox and Google Chrome.
        p   Zero zero steam & trade; The data coverage supported by the query is subject to the official announcement.
        p   In order to ensure the auto - trade; The healthy operation of the service environment. System has operation flow analysis and limit rules, on the user's operating frequency has a certain limit rules express, users must register clear recognition and comply with this constraint may register and buy zero zero steam & trade; .

        div
            b   The user information
        p   In order to guarantee your rights and interests, please ensure the authenticity, accuracy and completeness of the registration information, and the distribution &trade of the cloud. Have the right to review user data, if not, the registration data provided untrue, inaccurate, not exhaustive, users need to assume corresponding responsibility and the resulting consequences, and cloud auto parts distribution & trade; Retention of the termination of the user's use of the automobile &trade; The right to services.
        p   Cloud and steam distribution &trade; Will fill out the registration information to the user, the user's real name/name, phone number, E-mail and other private information shall be strictly confidential, unless authorized by users or otherwise provided by law, cloud auto parts distribution will not disclose customer information to the outside world. 
        p   User registration and successful activation of the 200 auto &trade; After that, users should carefully and reasonably save, use their user name and password. If users find any unauthorized use of user accounts or any security breach, please contact the cloud auto distribution &trade immediately. Make the authentication information change.
        p   Users agree that the cloud distribution &trade; With the form of email, text message, telephone, etc., to the registered users of this site to send the auto &trade; Relevant promotion activities and other information such as the right to inform.
        p   Users agree that the cloud distribution &trade; The user shall have the right to use the registration information of the user and the information of the accessory inquiry data, and log in to the user and other registered accounts for evidence preservation, including but not limited to notarization and witness.
        
        div
            b   The user is obligated according to law.
        p   This agreement is formulated in accordance with the relevant laws and regulations of the state, and the user agrees to strictly observe the following business:
        p   Published: may not transfer or incitement to resist, undermine the constitution and laws, administrative rules and regulations implementation, incitement to subvert state power, to overthrow the socialist system, division talk of the country, undermine national unity, incite ethnic hatred, ethnic discrimination and undermining national unity;
        p   Users shall not be allowed to enter the auto industry. Implement reverse engineering, malicious multi-frequency query and other behaviors to grasp the reorganization data.
        p   Not to instigate others to engage in ACTS prohibited by this article;
        p   Users should pay attention to and comply with all kinds of legal rules and regulations published or amended from time to time.
        p   This site reserves the right to delete all kinds of information that are not in accordance with the legal policy or the unreal information without notifying the user.
        p   If the user fails to comply with the above provisions, the cloud automobile distribution &trade; The right to make independent judgment and to suspend or close user account. Users must use the auto - trade; To undertake the legal liability for the conduct of the inquiry.

        div
            b   Protocol updates and user focus obligations.
        p   According to the changes of national laws and regulations and the auto industry; The operation needs, the cloud steam distribution &trade; Have the right to modify the terms of this agreement without timing, and the revised agreement shall be posted in the steam &trade. Or any official channel that takes effect and replaces the original agreement. Users can access the latest agreement at any time; Users are obligated to pay attention to and read the latest version of the agreement and any official announcements from time to time. If the user does not agree to the updated agreement, it can and should immediately cease to accept the auto trade. Services provided under this agreement; If the user continues to use the steam &trade; The service provided is deemed to be an agreement to be updated. Cloud and steam distribution &trade; It is recommended that you use the steam &trade; Read this agreement and the announcement of this website. If any of this agreement is deemed to be invalidated, invalid or unenforceable for any reason, the article shall be deemed to be separable and shall not affect the validity and enforceability of any remaining provisions.

        div
            b   Legal jurisdiction and application.
        p   The conclusion, execution and interpretation of this agreement and the settlement of disputes shall apply to the effective laws applicable to the mainland of the People's Republic of China (excluding the conflict rules). In case of any conflict between this agreement and the applicable laws, these provisions shall be reinterpreted in full accordance with the provisions of the law, while other valid provisions shall remain valid. If there is any dispute between the parties regarding the content of this agreement or its implementation, the parties shall try their best to resolve it amicably. If the negotiation fails, either party may file a lawsuit with the mainland district court of the People's Republic of China with jurisdiction.
</template>

<script>
import Vuex from "vuex";
export default {
  methods: {
      ...Vuex.mapMutations([
        "agreeHidden"
        ]),
      hiddenself (){
          this.agreeHidden()
      }
  }
}
</script>

<style lang="less" scoped>
      .useragreement{
        position: fixed;
        top: 96px;
        left: 0;
        text-align: center;
        margin-left: 10%;
        width: 80%;
        height: 400px;
        background: white;
        border: 1px solid #D8D8D8;
        box-shadow: 0 4px 14px 0 rgba(51, 51, 51, 0.4);
        border-radius: 4px;
        z-index: 1;
        overflow: auto;
        .navigationbar{
            position: relative;
            background-color: #0D6FB8;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-top-right-radius: 4px;
            border-top-left-radius: 4px;
            span{
                font-size: 14px;
                color: #FFFFFF;
            }
            .closeimg{
                position: absolute;
                top: 0;
                right: 0px;
                width: 40px;
                height: 40px;
                background: url(../../../static/img/p_wo.png) no-repeat 0 -600px;
                border: 0;
                outline: 0;
                cursor: pointer;
            }
        }
        .useragreecontent{
            height: 360px;
            overflow: auto;
            padding-top: 20px;
            text-align: left;
            div{
                font-size: 14px;
                color: #666;
            }
            p{
                color: #333;
                font-size: 12px;
                
            }
        }
        
    }
</style>


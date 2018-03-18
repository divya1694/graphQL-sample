import {getLatestByUserId} from "../helpers/elasticSearch";


const resolvers = {
    Query: {

        getListByAgentID: async (root, args, context) => {
            let request = {
                "from":0,
                "size":100,
                "query": {
                        "match_phrase": {
                        "created_by_userId": args.agentId
                    }
                }};

            var res = await getLatestByUserId(request,"/policies")
            var res1 = await getLatestByUserId(request,"/orders")


            let hits = res.hits.hits;
            let hits1 = res1.hits.hits;
            hits1 = hits1.filter(e => {
                for(let i=0;i<hits.length;i++) {
                    if(e._source.order_id === hits[i]._source.order_id)
                        return false;
                }
                return true;
            });

            res1.hits.hits = hits1;


            var res2 = await getLatestByUserId(request,"/enquiries")

            let hits3 = res1.hits.hits;
            let hits2 = res2.hits.hits;
            hits2 = hits2.filter(e => {
                for(let i=0;i<hits3.length;i++) {
                    if(e._source.enquiry_id === hits3[i]._source.enquiry_id)
                        return false;
                }
                return true;
            });

            res2.hits.hits = hits2;



            return {policyList: res,orderList:res1,enquiryList:res2};
           }
    }

};



module.exports = resolvers;

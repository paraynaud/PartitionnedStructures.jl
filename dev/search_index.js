var documenterSearchIndex = {"docs":
[{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/#Contents","page":"Reference","title":"Contents","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"Pages = [\"reference.md\"]","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/#Index","page":"Reference","title":"Index","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"Pages = [\"reference.md\"]","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [PartitionedStructures, M_abstract_part_struct,M_abstract_element_struct,M_internal_elt_vec,M_internal_pv,M_elt_vec,ModElemental_ev,ModElemental_pv,M_elt_mat,M_part_mat,M_part_v,ModElemental_pm,ModElemental_em,M_okoubi_koko,M_frontale, M_1_parallel, M_2_parallel, M_3_parallel, Utils, PartitionedQuasiNewton, PartitionedLOQuasiNewton, ModElemental_elom_bfgs, ModElemental_plom_bfgs, ModElemental_elom_sr1, ModElemental_plom]","category":"page"},{"location":"reference/#PartitionedStructures.M_internal_pv.rand_ipv-Tuple{Int64, Int64}","page":"Reference","title":"PartitionedStructures.M_internal_pv.rand_ipv","text":"\tnew_internal_pv(N,n;nᵢ,T)\n\nDefine an internal partitionned vector of N elemental nᵢ-sized vector simulating a n-sized T-vector.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_ev.eev_from_sparse_vec-Union{Tuple{SparseArrays.SparseVector{T, Y}}, Tuple{Y}, Tuple{T}} where {T, Y}","page":"Reference","title":"PartitionedStructures.ModElemental_ev.eev_from_sparse_vec","text":"SparseArrays.SparseVector interface\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_part_v.build_v!-Union{Tuple{Elemental_pv{T}}, Tuple{T}} where T","page":"Reference","title":"PartitionedStructures.M_part_v.build_v!","text":"\tbuild_v!(pv)\n\nBuild from pv the vector v according to the information of each {evᵢ}ᵢ\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pv.add_epv!-Union{Tuple{T}, Tuple{Elemental_pv{T}, Elemental_pv{T}}} where T<:Number","page":"Reference","title":"PartitionedStructures.ModElemental_pv.add_epv!","text":"\tadd_epv!(epv1,epv2)\n\nBuild in place of epv2 the addition of epv1 and epv2. Concretely each corresponding elemental vector will be add. \n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pv.create_epv-Union{Tuple{Array{SparseArrays.SparseVector{T, Y}, 1}}, Tuple{Y}, Tuple{T}} where {T, Y}","page":"Reference","title":"PartitionedStructures.ModElemental_pv.create_epv","text":"\tcreate_elemental_pv(elt_ev_set)\n\ncreate easily a pv from eltevset (confort)\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pv.initialize_component_list!-Tuple{Any}","page":"Reference","title":"PartitionedStructures.ModElemental_pv.initialize_component_list!","text":"initialize_component_list!(epm)\n\ninitializecomponentlist! Build for each index i (∈ {1,...,n}) the list of the blocs using i.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pv.minus_epv!-Union{Tuple{Elemental_pv{T}}, Tuple{T}} where T<:Number","page":"Reference","title":"PartitionedStructures.ModElemental_pv.minus_epv!","text":"\tminus_epv!(epv)\n\nBuild in place the -epv, by inversing the value of each elemental element vector.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pv.ones_kchained_epv-Tuple{Int64, Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_pv.ones_kchained_epv","text":"\tones_kchained_epv(N, k; T)\n\nConstruct a N-partitionned k-sized vector such as n = N+k. eltype(pv)=T\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pv.rand_epv-Tuple{Int64, Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_pv.rand_epv","text":"\tnew_elemental_pv(N,n;nᵢ,T)\n\nDefine an elemental partitionned vector of N elemental nᵢ-sized vector simulating a n-sized T-vector.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_part_mat.reset_spm!-Union{Tuple{T}, Tuple{Y}} where {Y<:Number, T<:Part_mat{Y}}","page":"Reference","title":"PartitionedStructures.M_part_mat.reset_spm!","text":"reset_spm!(pm) Reset the sparse matrix pm.spm\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_part_v.build_v-Tuple{T} where T<:Part_v","page":"Reference","title":"PartitionedStructures.M_part_v.build_v","text":"\tbuild_v(pv)\n\nBuild the vector v from the partitionned vector pv. Call specialised method depending the type of the element vector inside pv For now if there is mix of elemental and internal element vectors it must be previously transform as internal partitioned vector.\n\n\n\n\n\n","category":"method"},{"location":"reference/#Base.permute!-Union{Tuple{T}, Tuple{Elemental_pm{T}, Vector{Int64}}} where T","page":"Reference","title":"Base.permute!","text":"\tpermute!(epm,p)\n\napply the permutation p to the elemental partitionned matrix epm. The permutation is applied to each eem via indices. The current epm permutation is stored in epm.permutation\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_part_mat.set_spm!-Union{Tuple{Elemental_pm{T}}, Tuple{T}} where T","page":"Reference","title":"PartitionedStructures.M_part_mat.set_spm!","text":"set_spm!(epm)\n\nBuild the sparse matrix spm from the blocs epm.eem_set, according to the indinces.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pm.correlated_var-Union{Tuple{T}, Tuple{Elemental_pm{T}, Int64}} where T","page":"Reference","title":"PartitionedStructures.ModElemental_pm.correlated_var","text":"\tcorrelated_var(epm,i)\n\ncorrelated_var(epm,i) get the linked vars to i depending the structure of epm.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pm.identity_epm-Tuple{Int64, Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_pm.identity_epm","text":"identity_epm(N,n; type, nie)\n\nCreate a a partitionned matrix of N nie-identity blocs whose positions are randoms\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pm.initialize_component_list!-Tuple{Any}","page":"Reference","title":"PartitionedStructures.ModElemental_pm.initialize_component_list!","text":"initialize_component_list!(epm)\n\ninitializecomponentlist! Build for each index i (∈ {1,...,n}) the list of the blocs using i.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pm.n_i_SPS-Tuple{Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_pm.n_i_SPS","text":"\tn_i_SPS(n)\n\nA nᵢ bloc separable matrix By default nᵢ = 5\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pm.n_i_sep-Tuple{Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_pm.n_i_sep","text":"\tn_i_diag_dom(n)\n\nA nᵢ bloc separable matrix By default nᵢ = 5\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pm.ones_epm-Tuple{Int64, Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_pm.ones_epm","text":"ones_epm(N,n; type, nie)\n\nCreate a a partitionned matrix of N ones(nie,nie) blocs whose positions are randoms. Be careful the partitionned matrix created may be singular.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pm.ones_epm_and_id-Tuple{Int64, Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_pm.ones_epm_and_id","text":"\tones_epm_and_id(N,n; type, nie)\n\nCreate a a partitionned matrix of N ones(nie,nie) blocs whose positions are randoms and adding . Not singular.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_pm.part_mat-Tuple{}","page":"Reference","title":"PartitionedStructures.ModElemental_pm.part_mat","text":"\tpart_mat(n)\n\nA nᵢ partially bloc separable matrix, whith on the diagonal band regular with overlapping (=1 by default) By default nᵢ=5, overlapping=1, mul=5.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_1_parallel.subproblem-Union{Tuple{T}, Tuple{Elemental_pm{T}, Elemental_pv{T}, Elemental_pv{T}, Vector{Int64}, Int64}} where T","page":"Reference","title":"PartitionedStructures.M_1_parallel.subproblem","text":"\tsubproblem(epm_A, epv_b, epv_x, comp_list, i)\n\ndefine the subproblem which must be solve for the i-th variable\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_2_parallel.subproblem!-Union{Tuple{T}, Tuple{Elemental_pm{T}, Elemental_pv{T}, Elemental_pv{T}, Int64, Vector{Bool}, Vector{T}}} where T","page":"Reference","title":"PartitionedStructures.M_2_parallel.subproblem!","text":"\tsubproblem(epm_A, epv_b, epv_x, comp_list, i)\n\ndefine the subproblem which must be solve for the i-th variable\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_3_parallel.subproblem3!-Union{Tuple{T}, Tuple{Elemental_pm{T}, Elemental_pv{T}, Elemental_pv{T}, Int64, Vector{Bool}, Vector{T}}} where T","page":"Reference","title":"PartitionedStructures.M_3_parallel.subproblem3!","text":"\tsubproblem(epm_A, epv_b, epv_x, comp_list, i)\n\ndefine the subproblem which must be solve for the i-th variable\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.Utils.BFGS-Union{Tuple{Y}, Tuple{Vector{Y}, Vector{Y}, Matrix{Y}}} where Y<:Number","page":"Reference","title":"PartitionedStructures.Utils.BFGS","text":"\tBFGS(s, y, B)\n\nPerform the BFGS update over the matrix B by using the vector s and y.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.Utils.SR1-Union{Tuple{Y}, Tuple{Vector{Y}, Vector{Y}, Matrix{Y}}} where Y<:Number","page":"Reference","title":"PartitionedStructures.Utils.SR1","text":"\tSR1(s, y, B)\n\nPerform the BFGS update over the matrix B by using the vector s and y.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.PartitionedQuasiNewton.PBFGS_update-Union{Tuple{T}, Tuple{Elemental_pm{T}, Elemental_pv{T}, Vector{T}}} where T","page":"Reference","title":"PartitionedStructures.PartitionedQuasiNewton.PBFGS_update","text":"\tPBFGS_update(epm_B, s, epv_y)\n\nDefine the partitioned BFGS update of the partioned matrix epmB, given the step s and the element gradient difference epvy\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.PartitionedQuasiNewton.PSR1_update-Union{Tuple{T}, Tuple{Elemental_pm{T}, Elemental_pv{T}, Vector{T}}} where T","page":"Reference","title":"PartitionedStructures.PartitionedQuasiNewton.PSR1_update","text":"\tPSR1_update(epm_B, s, epv_y)\n\nDefine the partitioned BFGS update of the partioned matrix epmB, given the step s and the element gradient difference epvy\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.PartitionedLOQuasiNewton.PLBFGS_update-Union{Tuple{T}, Tuple{Elemental_plom_bfgs{T}, Elemental_pv{T}, Vector{T}}} where T","page":"Reference","title":"PartitionedStructures.PartitionedLOQuasiNewton.PLBFGS_update","text":"\tPLBFGS_update(eplom_B, s, epv_y)\n\nDefine the partitioned BFGS update of the partioned matrix eplomB, given the step s and the element gradient difference epvy\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.PartitionedLOQuasiNewton.Part_update-Union{Tuple{Y}, Tuple{T}, Tuple{Y, Elemental_pv{T}, Vector{T}}} where {T, Y<:Part_LO_mat{T}}","page":"Reference","title":"PartitionedStructures.PartitionedLOQuasiNewton.Part_update","text":"\tPart_update(eplom_B, epv_y, s)\n\nPerform the partitionned update of eplomB. eplomB is build from LBFGS or LSR1 elemental element matrices. The update performed on eachh element matrix correspond to the linear operator associated.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_part_mat.set_spm!-Union{Tuple{Elemental_plom_bfgs{T}}, Tuple{T}} where T","page":"Reference","title":"PartitionedStructures.M_part_mat.set_spm!","text":"\tset_spm!(eplom)\n\nBuild the sparse matrix spm from the blocs eplom.eelom_set, according to the indices.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_plom_bfgs.PLBFGS_eplom-Tuple{}","page":"Reference","title":"PartitionedStructures.ModElemental_plom_bfgs.PLBFGS_eplom","text":"PLBFGS_eplom(N,n; type, nie)\n\nCreate a a partitionned limited memory matrix of N LBFGSLinearOperators blocks whose overlap next block coordinates by overlapping.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_plom_bfgs.PLBFGS_eplom_rand-Tuple{Int64, Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_plom_bfgs.PLBFGS_eplom_rand","text":"PLBFGS_eplom_rand(N,n; type, nie)\n\nCreate a a partitionned limited memory matrix of N LBFGSLinearOperators blocs whose positions are randoms\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_plom_bfgs.initialize_component_list!-Tuple{Any}","page":"Reference","title":"PartitionedStructures.ModElemental_plom_bfgs.initialize_component_list!","text":"\tinitialize_component_list!(eplom)\n\ninitializecomponentlist! Build for each index i (∈ {1,...,n}) the list of the blocs using i.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.M_part_mat.set_spm!-Union{Tuple{Elemental_plom{T}}, Tuple{T}} where T","page":"Reference","title":"PartitionedStructures.M_part_mat.set_spm!","text":"\tset_spm!(eplom)\n\nBuild the sparse matrix spm from the blocs eplom.eelom_set, according to the indices.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_plom.PLBFGSR1_eplom-Tuple{}","page":"Reference","title":"PartitionedStructures.ModElemental_plom.PLBFGSR1_eplom","text":"PLBFGS_eplom(N,n; type, nie)\n\nCreate a a partitionned limited memory matrix of N LBFGSLinearOperators blocks whose overlap next block coordinates by overlapping.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_plom.PLBFGSR1_eplom_rand-Tuple{Int64, Int64}","page":"Reference","title":"PartitionedStructures.ModElemental_plom.PLBFGSR1_eplom_rand","text":"PLBFGS_eplom_rand(N,n; type, nie)\n\nCreate a a partitionned limited memory matrix of N LBFGSLinearOperators blocs whose positions are randoms\n\n\n\n\n\n","category":"method"},{"location":"reference/#PartitionedStructures.ModElemental_plom.initialize_component_list!-Tuple{Any}","page":"Reference","title":"PartitionedStructures.ModElemental_plom.initialize_component_list!","text":"\tinitialize_component_list!(eplom)\n\ninitializecomponentlist! Build for each index i (∈ {1,...,n}) the list of the blocs using i.\n\n\n\n\n\n","category":"method"},{"location":"#PartitionedStructures.jl","page":"Home","title":"PartitionedStructures.jl","text":"","category":"section"},{"location":"tutorial/#PartitionedStructures.jl-Tutorial","page":"Tutorial","title":"PartitionedStructures.jl Tutorial","text":"","category":"section"}]
}

module ModElemental_plom
	using SparseArrays, LinearOperators

	using ..M_part_mat
	using ..M_elt_mat, ..M_abstract_element_struct, ..ModElemental_elom
	
	import Base.==, Base.copy, Base.similar
	import ..M_part_mat.set_spm!, ..M_part_mat.get_spm

	import Base.Matrix, SparseArrays.SparseMatrixCSC

	
	mutable struct Elemental_plom{T} <: Part_mat{T}
		N :: Int
		n :: Int
		eelom_set :: Vector{Elemental_elom{T}}
		spm :: SparseMatrixCSC{T,Int}
		L :: SparseMatrixCSC{T,Int}
		component_list :: Vector{Vector{Int}}
		permutation :: Vector{Int} # n-size vector 
	end
	
	
	@inline get_eelom_set(eplom :: Elemental_plom{T}) where T = eplom.eelom_set
	@inline get_eelom_set(eplom :: Elemental_plom{T}, i::Int) where T = @inbounds eplom.eelom_set[i]
	@inline get_eelom_sub_set(eplom :: Elemental_plom{T}, indices::Vector{Int}) where T = eplom.eelom_set[indices]
	@inline get_eelom_set_Bie(eplom :: Elemental_plom{T}, i::Int) where T = get_Bie(get_eelom_set(eplom,i))
	
	@inline get_spm(eplom :: Elemental_plom{T}) where T = eplom.spm
	@inline get_spm(eplom :: Elemental_plom{T}, i :: Int, j :: Int) where T = @inbounds eplom.spm[i,j]
	@inline get_L(eplom :: Elemental_plom{T}) where T = eplom.L
	@inline get_L(eplom :: Elemental_plom{T}, i :: Int, j :: Int) where T = @inbounds eplom.L[i,j]
	@inline get_component_list(eplom :: Elemental_plom{T}) where T = eplom.component_list
	@inline get_component_list(eplom :: Elemental_plom{T},i::Int) where T = @inbounds eplom.component_list[i]
	
	@inline set_L!(eplom :: Elemental_plom{T}, i :: Int, j :: Int, v :: T) where T = @inbounds eplom.L[i,j] = v
	@inline set_L_to_spm!(eplom :: Elemental_plom{T}) where T = eplom.L = copy(eplom.spm)
		
		
		
	@inline (==)(eplom1 :: Elemental_plom{T}, eplom2 :: Elemental_plom{T}) where T = (get_N(eplom1) == get_N(eplom2)) && (get_n(eplom1) == get_n(eplom2)) && (get_eelom_set(eplom1) .== get_eelom_set(eplom2)) && (get_permutation(eplom1) == get_permutation(eplom2))
	@inline copy(eplom :: Elemental_plom{T}) where T = Elemental_plom{T}(copy(get_N(eplom)),copy(get_n(eplom)),copy.(get_eelom_set(eplom)),copy(get_spm(eplom)), copy(get_L(eplom)),copy(get_component_list(eplom)),copy(get_permutation(eplom)))
	@inline similar(eplom :: Elemental_plom{T}) where T = Elemental_plom{T}(copy(get_N(eplom)),copy(get_n(eplom)),similar.(get_eelom_set(eplom)),similar(get_spm(eplom)), similar(get_L(eplom)),copy(get_component_list(eplom)),copy(get_permutation(eplom)))
	
	
	
	"""
		PLBFGS_eplom(N,n; type, nie)
	Create a a partitionned limited memory matrix of N LBFGSLinearOperators blocks whose overlap next block coordinates by overlapping.
	"""
	function PLBFGS_eplom(;n::Int=9, T=Float64, nie::Int=5, overlapping::Int=1)		
		overlapping < nie || error("l'overlapping doit être plus faible que nie")
		mod(n-(nie-overlapping), nie-overlapping) == mod(overlapping, nie-overlapping) || error("wrong structure: mod(n-(nie-over), nie-over) == mod(over, nie-over) must holds")
	
		indices = filter(x -> x <= n-nie+1, vcat(1,(x -> x + (nie-overlapping)).([1:nie-overlapping:n-(nie-overlapping);])))
		eelom_set = map(i -> LBFGS_eelom(nie;T=T,index=i), indices)	
		N = length(indices)
		spm = spzeros(T,n,n)
		L = spzeros(T,n,n)
		component_list = map(i -> Vector{Int}(undef,0), [1:n;])
		no_perm = [1:n;]
		eplom = Elemental_plom{T}(N,n,eelom_set,spm,L,component_list,no_perm)
		initialize_component_list!(eplom)
		return eplom
	end 
	
	
	"""
		PLBFGS_eplom_rand(N,n; type, nie)
	Create a a partitionned limited memory matrix of N LBFGSLinearOperators blocs whose positions are randoms
	"""
	function PLBFGS_eplom_rand(N :: Int, n ::Int; T=Float64, nie::Int=5)		
		eelom_set = map(i -> LBFGS_eelom_rand(nie;T=T,n=n), [1:N;])
		spm = spzeros(T,n,n)
		L = spzeros(T,n,n)
		component_list = map(i -> Vector{Int}(undef,0), [1:n;])
		no_perm = [1:n;]
		eplom = Elemental_plom{T}(N,n,eelom_set,spm,L,component_list,no_perm)
		initialize_component_list!(eplom)	
		return eplom
	end 
	
	
	"""
			initialize_component_list!(eplom)
	initialize_component_list! Build for each index i (∈ {1,...,n}) the list of the blocs using i.
	"""
	function initialize_component_list!(eplom)
		N = get_N(eplom)
		for i in 1:N
			eelomᵢ = get_eelom_set(eplom,i)
			_indices = get_indices(eelomᵢ)
			for j in _indices 
				push!(get_component_list(eplom,j),i)
			end 
		end 
	end 
	
	"""
			reset_spm!(eplom)
	Reset the sparse matrix eplom.spm
	"""
	@inline reset_spm!(eplom :: Elemental_plom{T}) where T = eplom.spm.nzval .= (T)(0) #.nzval delete the 1 alloc
	@inline hard_reset_spm!(eplom :: Elemental_plom{T}) where T = eplom.spm = spzeros(T,get_n(eplom),get_n(eplom))
	@inline reset_L!(eplom :: Elemental_plom{T}) where T = eplom.L.nzval .= (T)(0) #.nzval delete the 1 alloc
	@inline hard_reset_L!(eplom :: Elemental_plom{T}) where T = eplom.L = spzeros(T,get_n(eplom),get_n(eplom))
	
	"""
			set_spm!(eplom)
	Build the sparse matrix spm from the blocs eplom.eelom_set, according to the indices.
	"""
	function set_spm!(eplom :: Elemental_plom{T}) where T
		reset_spm!(eplom) # eplom.spm .= 0
		N = get_N(eplom)	
		n = get_n(eplom)
		spm = get_spm(eplom)
		for i in 1:N
			eplomᵢ = get_eelom_set(eplom,i)
			nie = get_nie(eplomᵢ)
			Bie = get_Bie(eplomᵢ)
			indicesᵢ = get_indices(eplomᵢ)
			value_Bie = zeros(T,nie,nie)
			map( (i -> value_Bie[:,i] .= Bie*SparseVector(nie,[i],[1])), 1:nie)
			spm[indicesᵢ,indicesᵢ] .+= value_Bie			
		end 
	end


	function Base.Matrix(eplom :: Elemental_plom{T}) where T
		set_spm!(eplom)
		sp_eplom = get_spm(eplom)
		m = Matrix(sp_eplom)
		return m
	end 

	SparseArrays.SparseMatrixCSC(eplom :: Elemental_plom{T}) where T = begin set_spm!(eplom); get_spm(eplom) end 


	export Elemental_plom
	export get_eelom_set, get_spm, get_L, get_component_list, get_eelom_set_Bie, get_eelom_sub_set
	export set_L!, set_L_to_spm!
	
	export initialize_component_list!
	export reset_spm!, set_spm!, set_L_to_spm!
	
	export PLBFGS_eplom, PLBFGS_eplom_rand
end 
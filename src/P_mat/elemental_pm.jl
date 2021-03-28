module M_elemental_pm
# Symmetric bloc elemental partitioned matrix

	using SparseArrays

	using ..M_part_mat
	using ..M_elt_mat, ..M_elemental_em
	
	
	mutable struct Elemental_pm{T} <: Part_mat{T}
		N :: Int
		n :: Int
		eem_set :: Vector{Elemental_em{T}}
		spm :: SparseMatrixCSC{T,Int}
		L :: SparseMatrixCSC{T,Int}
		component_list :: Vector{Vector{Int}}
		permutation :: Vector{Int} # n-size vector 
	end

	#getter/setter
	get_eem_set(epm :: Elemental_pm{T}) where T = epm.eem_set
	get_eem_set(epm :: Elemental_pm{T}, i::Int) where T = epm.eem_set[i]

	get_spm(epm :: Elemental_pm{T}) where T = epm.spm
	get_L(epm :: Elemental_pm{T}) where T = epm.L
	get_component_list(epm :: Elemental_pm{T}) where T = epm.component_list
	get_component_list(epm :: Elemental_pm{T},i::Int) where T = epm.component_list[i]
	
	
	import Base.==
	(==)(epm1 :: Elemental_pm{T}, epm2 :: Elemental_pm{T}) where T = (get_N(epm1) == get_N(epm2)) && (get_n(epm1) == get_n(epm2)) && (get_eem_set(epm1).== get_eem_set(epm2)) && (get_permutation(epm1) == get_permutation(epm2))

	import Base.copy
	copy(epm :: Elemental_pm{T}) where T = Elemental_pm{T}(copy(get_N(epm)),copy(get_n(epm)),copy.(get_eem_set(epm)),copy(get_spm(epm)), copy(get_L(epm)),copy(get_component_list(epm)),copy(get_permutation(epm)))
	"""
		identity_epm(N,n; type, nie)
	Create a a partitionned matrix of N nie-identity blocs whose positions are randoms
	"""
	function identity_epm(N :: Int, n ::Int; T=Float64, nie::Int=5)		
		eem_set = map(i -> identity_eem(nie;T=T,n=n), [1:N;])
		spm = spzeros(T,n,n)
		L = spzeros(T,n,n)
		component_list = map(i -> Vector{Int}(undef,0), [1:n;])
		no_perm = [1:n;]
		epm = Elemental_pm{T}(N,n,eem_set,spm,L,component_list,no_perm)
		initialize_component_list!(epm)
		set_spm!(epm)
		return epm
	end 

	"""
		ones_epm(N,n; type, nie)
	Create a a partitionned matrix of N ones(nie,nie) blocs whose positions are randoms
	"""
	function ones_epm(N :: Int, n ::Int; T=Float64, nie::Int=5)		
		eem_set = map(i -> ones_eem(nie;T=T,n=n), [1:N;])
		spm = spzeros(T,n,n)
		L = spzeros(T,n,n)
		component_list = map(i -> Vector{Int}(undef,0), [1:n;])
		no_perm= [1:n;]
		epm = Elemental_pm{T}(N,n,eem_set,spm,L,component_list,no_perm)
		initialize_component_list!(epm)
		set_spm!(epm)
		return epm
	end 


	"""
		initialize_component_list!(epm)
	initialize_component_list! Build for each index i the list of the blocs using i.
	"""
	function initialize_component_list!(epm)
		N = get_N(epm)
		n = get_n(epm)
		for i in 1:N
			eemᵢ = get_eem_set(epm,i)
			_indices = get_indices(eemᵢ)
			for j in _indices 
				push!(get_component_list(epm,j),i)
			end 
		end 
	end 

	"""
		reset_spm!(epm)
	Reset the sparse matrix epm.spm
	"""
	@inline reset_spm!(epm :: Elemental_pm{T}) where T = epm.spm.nzval .= (T)(0) #.nzval delete the 1 alloc
	@inline hard_reset_spm!(epm :: Elemental_pm{T}) where T = epm.spm = spzeros(T,get_n(epm),get_n(epm))

	@inline reset_L!(epm :: Elemental_pm{T}) where T = epm.L.nzval .= (T)(0) #.nzval delete the 1 alloc
	@inline hard_reset_L!(epm :: Elemental_pm{T}) where T = epm.L = spzeros(T,get_n(epm),get_n(epm))

	"""
		set_spm!(epm)
	Build the sparse matrix spm from the blocs epm.eem_set, according to the indinces.
	"""
	function set_spm!(epm :: Elemental_pm{T}) where T
		reset_spm!(epm) # epm.spm .= 0

		N = get_N(epm)
		n = get_n(epm)
		spm = get_spm(epm)
		for i in 1:N
			epmᵢ = get_eem_set(epm,i)
			nie = get_nie(epmᵢ)
			hie = get_hie(epmᵢ)
			for i in 1:nie, j in 1:nie
				val = hie[i,j]
				real_i = get_indices(epmᵢ,i) # epmᵢ.indices[i]
				real_j = get_indices(epmᵢ,j) # epmᵢ.indices[j]
				spm[real_i, real_j] += val 
			end 
		end 
	end

	import Base.permute! 
	"""
			permute!(epm,p)
	apply the permutation p to the elemental partitionned matrix epm.
	The permutation is applied to each eem via indices.
	The current epm permutation is stored in epm.permutation
	"""
	function permute!(epm :: Elemental_pm{T}, p :: Vector{Int}) where T
		N = get_N(epm)
		n = get_n(epm)
		# permute on element matrix 
		for i in 1:N
			epmᵢ = get_eem_set(epm,i)
			indicesᵢ = get_indices(epmᵢ)
			e_perm = Vector(view(p,indicesᵢ))
			permute!(epmᵢ,e_perm)
		end 
		# permute on the permutation vector
		perm = get_permutation(epm)
		permute!(perm, p)
		# permute component list
		new_component_list = Vector{Vector{Int}}(undef,n)
		for i in 1:n
			new_component_list[i] = get_component_list(epm, p[i])
		end 
		# hard reset of the sparse matrix
		hard_reset_spm!(epm)
	end 

	export Elemental_pm

	export get_eem_set, get_spm, get_component_list
	export initialize_component_list!
	export reset_spm!, set_spm!
	export identity_epm, ones_epm
end
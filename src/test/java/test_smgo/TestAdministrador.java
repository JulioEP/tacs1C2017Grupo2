package test_smgo;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import creacionales.UsuarioBuilder;
import model.MovieList;
import model.Rol;
import model.Usuario;
import repos.RepoMoviesLists;
import repos.RepoUsuarios;
import tacs.Application;
import tacs.MovieController;
import tacs.UserController;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
public class TestAdministrador {

	private MockMvc mockMvc;

    @Before
    public void setup() {
        this.mockMvc = standaloneSetup(new UserController()).build();
		Rol usr = new Rol("Usuario");
	
		Usuario guille = new UsuarioBuilder("Guille").pass("1234").rol(usr).build();
		RepoUsuarios.getInstance().addUsuario(guille);
		
		MovieList rankingMovies = new MovieList("Lista A", guille.getId());
		MovieController mc = new MovieController();
	
	
		rankingMovies.addPelicula(mc.getPeliculaById((long)120));
		rankingMovies.addPelicula(mc.getPeliculaById((long)121));
		rankingMovies.addPelicula(mc.getPeliculaById((long)122));
//		MovieListController mcl = new MovieListController();
	
		RepoMoviesLists.getInstance().addMovieList(rankingMovies);

    }

    //Como administrador quiero poder ver los siguientes datos de un usuario
    @Test
    public void testGetDetalleUsuario() throws Exception{
    	
    	this.mockMvc.perform(get("/usuarios/{id}",1).accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andExpect(status().isOk())
            	.andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.username").value("Guille"))
                .andExpect(jsonPath("$.listaMovieList", hasSize(1)))
                .andExpect(jsonPath("$.actoresFavoritos", hasSize(0)))
                .andExpect(jsonPath("$.ultimaSesion").isEmpty())
                .andExpect(jsonPath("$.listaMovieList[0].nombre").value("Lista A"))
                .andExpect(jsonPath("$.listaMovieList[0].listaPeliculas", hasSize(3)))
                .andDo(print());
    	
    }
}
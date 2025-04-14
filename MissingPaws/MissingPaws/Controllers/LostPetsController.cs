using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MissingPaws.Models;
using MissingPaws.Data;

namespace MissingPaws.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LostPetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LostPetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LostPets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LostPet>>> GetLostPets()
        {
            return await _context.LostPets
                .Where(p => p.IsApproved)
                .ToListAsync();
        }

        // GET: api/LostPets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LostPet>> GetLostPet(int id)
        {
            var pet = await _context.LostPets.FindAsync(id);

            if (pet == null)
                return NotFound();

            return pet;
        }

        // POST: api/LostPets
        [HttpPost]
        public async Task<ActionResult<LostPet>> PostLostPet(LostPet pet)
        {
            _context.LostPets.Add(pet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLostPet), new { id = pet.Id }, pet);
        }

        // PUT: api/LostPets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLostPet(int id, LostPet updatedPet)
        {
            if (id != updatedPet.Id)
                return BadRequest();

            _context.Entry(updatedPet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.LostPets.Any(p => p.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/LostPets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLostPet(int id)
        {
            var pet = await _context.LostPets.FindAsync(id);

            if (pet == null)
                return NotFound();

            _context.LostPets.Remove(pet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApprovePet(int id)
        {
            var pet = await _context.LostPets.FindAsync(id);
            if (pet == null)
                return NotFound();

            pet.IsApproved = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
